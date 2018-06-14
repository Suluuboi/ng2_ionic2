import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setItem(name, value){
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  getItem(name){
    return JSON.parse(window.localStorage.getItem(name));
  }

  removeItem(name){
    window.localStorage.removeItem(name);
  }

  // 本地存储设置时间 key: name, value: value, time: t(设置为小时。 默认为2小时)
  setItemAnyTime(name, value, t){
    window.localStorage.setItem(name, JSON.stringify(value));
    setTimeout( ()=>{
      window.localStorage.removeItem(name);
    }, t*60*60*1000);
  }

}
