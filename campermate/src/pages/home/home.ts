import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { LocationPage } from '../location/location';
//import { MyDetailsPage } from '../my-details/my-details';
//import { CampDetailsPage } from '../camp-details/camp-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    tab1Root:any = "LocationPage";
    tab2Root:any = "MyDetailsPage";
    tab3Root:any = "CampDetailsPage";

  constructor(public navCtrl: NavController) {

  }

}
