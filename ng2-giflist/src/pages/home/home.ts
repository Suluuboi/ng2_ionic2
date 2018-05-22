import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Keyboard } from '@ionic-native/keyboard';
import { FormControl } from '@angular/forms';

import { SettingsPage } from '../settings/settings';
import { DataProvider } from '../../providers/data/data';
import { RedditProvider } from '../../providers/reddit/reddit';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  subredditValue:string;
  subredditControl:FormControl;

  constructor(public navCtrl: NavController, public dataservice:DataProvider, public redditService:RedditProvider, private keyboard:Keyboard,public modalCtrl:ModalController, public platform:Platform) {
    this.subredditControl = new FormControl();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
    this.subredditControl.valueChanges.debounceTime(1500)
    .distinctUntilChanged().subscribe(subreddit=>{
      if(subreddit!=''&&subreddit){
        this.redditService.subreddit = subreddit;
        this.changeSubreddit();
        this.keyboard.close();
      }
    });

    this.platform.ready().then(()=>{
      this.loadSettings();}
    );
  }

  loadSettings(): void {
    this.dataservice.getData().then((settings)=>{
      if(settings&&typeof(settings)!="undefined"){
        let newSettings = JSON.parse(settings);
        this.redditService.settings = newSettings;
        if(newSettings.length!=0){
          this.redditService.sort=newSettings.sort;
          this.redditService.perPage=newSettings.perPage;
          this.redditService.subreddit=newSettings.subreddit;
        }
      }
      this.changeSubreddit();
    });

  }

  openSettings():void {
    let settingModal=this.modalCtrl.create(SettingsPage,{
      perPage:this.redditService.perPage,
      sort:this.redditService.sort,
      subreddit:this.redditService.subreddit
    });

    settingModal.onDidDismiss(settings=>{
      if(settings){
        this.redditService.perPage=settings.perPage;
        this.redditService.sort=settings.sort;
        this.redditService.subreddit=settings.subreddit;
        this.dataservice.save(settings);
        this.changeSubreddit();
      }
    });

    settingModal.present();
  }

  loadMore():void{
    this.redditService.nextPage();

  }

  showComments(post):void {
    let browser = new InAppBrowser;
    browser.create('https://reddit.com'+post.data.permalink,'_system');
  }

  playVideo(e, post):void {
    let video = e.target.getElementByTagName('video')[0];
    if(!post.alreadyLoaded){
      post.showLoader = true;
    }

    if(video.paused){
      video.play();
      video.addEventListener("playing", function(e){
        post.showLoader = false;
        post.alreadyLoaded = true;
      });
    }
    else {
      video.pause();
    }

  }

  changeSubreddit():void {
    this.redditService.resetPosts();
  }
}
