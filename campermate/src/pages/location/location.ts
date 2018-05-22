import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMapsProvider, public platform: Platform, public dataService: DataProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  setLocation(){

  }

  takeMeHome(){

  }
}
