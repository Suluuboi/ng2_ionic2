import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ChecklistPage  } from '../checklist/checklist';
import { IntroPage } from '../intro/intro';
import { ChecklistModel } from '../checklist/checklist-model';
import { DataProvider } from '../../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  checklists: ChecklistModel[] =[];
  
  constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl:AlertController, private keyboard: Keyboard, public storage: Storage, public platform: Platform) {
  }

  ionViewDidLoad(){
    this.platform.ready().then(
      ()=>{
      this.storage.get('introShown').then(
        (result)=>{
          if(!result){
            this.storage.set('introShown', true);
            this.navCtrl.setRoot(IntroPage);
          }
        }
      );

        this.dataService.getData('checklists').then((checklists)=>{
          let savedChecklists:any = false;
          if (typeof(checklists)!=undefined){
            savedChecklists = JSON.parse(checklists);
          }
          if(savedChecklists){
            savedChecklists.forEach((savedchecklist)=>{
              let loadchecklist = new ChecklistModel(savedchecklist.title, savedchecklist.items);
              this.checklists.push(loadchecklist);
              loadchecklist.checklist.subscribe(update=>{
                this.save();
              });
            });
          }

        });
      }
    );
  }

  addChecklist():void{
    let prompt = this.alertCtrl.create(
      {
        title: 'New Checklist',
        message: 'Enter the name of your new checklist below:',
        inputs:[
          {name:'name'
          }
        ],
        buttons:[
          {text:'Cancel'},
          {
            text:'Save',
            handler:data=>{
              let newChecklist = new ChecklistModel(data.name, []);
              this.checklists.push(newChecklist);
              newChecklist.checklist.subscribe(update=>{
                this.save();
              });
              this.save();
            }
          }
        ]
        
      }
    );
    prompt.present();
  }
  
  renameChecklist(checklist): void {
    let prompt = this.alertCtrl.create(
      {
        title: 'Rename Checklist',
        message: 'Enter a new name for this checklist below:',
        inputs:[
          {name:'name'
          }
        ],
        buttons:[
          {text:'Cancel'},
          {
            text:'Save',
            handler:data=>{
              let index = this.checklists.indexOf(checklist);
              if(index>-1){
                this.checklists[index].setTitle(data.name);
                this.save();
              }              
              }
            }
        ]
        
      }
    );
    prompt.present();
  }

  viewChecklist(checklist): void {
    this.navCtrl.push(ChecklistPage,{
      checklist:checklist
    });
  } 
  
  removeChecklist(checklist): void{
    let index = this.checklists.indexOf(checklist);
    if(index>-1){
      this.checklists.splice(index,1);
      this.save();
    }
  } 

  save(): void{
    this.keyboard.close();
    this.dataService.save('checklists', this.checklists);
  }
}
