import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/vative/storage';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {
    console.log('Hello DataProvider Provider');
  }

  setMyDetails(data: Object): void {
  let newData = JSON.stringify(data);
  this.storage.set('mydetails', newData);
  }

  setCampDetails(data: Object): void {
  let newData = JSON.stringify(data);
  this.storage.set('campdetails', newData);
  }

  setLocation(data: Object): void {
  let newData = JSON.stringify(data);
  this.storage.set('location', newData);
  }
  
  getMyDetails(): Promise<any> {
  return this.storage.get('mydetails');
  }
  
  getCampDetails(): Promise<any> {
  return this.storage.get('campdetails');
  }
  
  getLocation(): Promise<any> {
  return this.storage.get('location');
  }

  //for quicklists app
    getData(key): Promise<any>{
    return this.storage.get(key);
  }

  save(key,data):void{
    let saveData = [];
    data.forEach(
      (checklist)=>{
        saveData.push({
          title:checklist.title,
          items:checklist.items
        });
      }
    );
    let newData = JSON.stringify(saveData);
    this.storage.set(key, newData);
  }
}
