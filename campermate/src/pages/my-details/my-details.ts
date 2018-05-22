import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the MyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html',
})
export class MyDetailsPage {
  MyDetailsForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public dataService:DataProvider) {
    this.MyDetailsForm = formBuilder.group({
      carRegistration:['',Validators.required],
      trailerRegistration:[''],
      trailerDimensions:[''],
      phoneNumber:[''],
      notes:['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDetailsPage');
  }

  saveForm(){
    let data = this.MyDetailsForm.value;
    //this.dataService.setMyDetails(data);
  }
}
