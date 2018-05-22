//import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

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
