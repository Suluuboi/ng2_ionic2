import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { PhotoModel } from '../../Models/photo-model';
//import { DaysAgoPipe } from '../../pipes/days-ago/days-ago';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos:PhotoModel[]=[];

  constructor(public navCtrl: NavController, public modalCtrl:ModalController) {

  }

  playSlideshow():void{
    if(this.photos.length>1){
      let modal=this.modalCtrl.create(SlideShowPage, {photos:this.photos});
      modal.present();
    }
    else {
    }
  }
}
