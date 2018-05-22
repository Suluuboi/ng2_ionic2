import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ElementRef,ViewChild } from 'ionic-angular';

/**
 * Generated class for the SlideShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slide-show',
  templateUrl: 'slide-show.html',
})
export class SlideShowPage {
  @ViewChild('imagePlayer') imagePlayer:ElementRef;
  photos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.photos=this.navParams.get('photos');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideShowPage');
  }
  ionViewDidEnter(){
    
  }

}
