import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the CampDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camp-details',
  templateUrl: 'camp-details.html',
})
export class CampDetailsPage {
  CampDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public dataService: DataProvider) {
    this.CampDetailsForm = formBuilder.group({
      gateAccessCode:['',Validators.required],
      ammenitiesCode:[''],
      wifiPassword:[''],
      phoneNumber:[''],
      departure:[''],
      notes:['']      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampDetailsPage');
  }

  saveForm(){
    let data = this.CampDetailsForm.value;
    //this.dataService.setCampDetails(data);
  }
}
