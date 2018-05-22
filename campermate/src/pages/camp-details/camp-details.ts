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
    this.platform.ready().then(() => {
      this.dataService.getCampDetails().then((details) => {
        let savedDetails: any = false;
        if(details && typeof(details) != "undefined"){
          savedDetails = JSON.parse(details);
          }
        let formControls: any = this.campDetailsForm.controls;
        if(savedDetails){
          formControls.gateAccessCode.setValue(savedDetails.gateAccessCode);
          formControls.ammenitiesCode.setValue(savedDetails.ammenitiesCode);
          formControls.wifiPassword.setValue(savedDetails.wifiPassword);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.departure.setValue(savedDetails.departure);
          formControls.notes.setValue(savedDetails.notes);
        }
      });
    });
  }

  saveForm(){
    let data = this.CampDetailsForm.value;
    //this.dataService.setCampDetails(data);
  }
}
