import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';
import { ApiData } from '../../../menu_config/data';

@Injectable()
export class GuidanceService {

  constructor(
    private http: HttpClient,
    private route: Router,
    private titleService: Title,
    private localStorageService: LocalStorageService
  ) { }

  
  // 获取办事指南详情
  getGuidanceDetail(opt){
    return this.HttpClientPost('/api/affair', opt).then(res=>{
      return res;
    })
  }
  // 获取办事指南类别
  getGuidanceTabs(){
    return this.HttpClientPost('/api/affair/types').then(res=>{
      return res;
    })
  }
  
  // 获取办事指南对应类别目录下的数据列表
  getGuidanceAffairsList(opt){
    return this.HttpClientPost('/api/affairs', opt).then(res=>{
      return res;
    })
  }
  
  // 获取新闻详情
  getGuidanceHomeInfos(){
    return this.HttpClientPost('/api/affair/type/affairs').then(res=>{
      return res;
    })
  }

  HttpClientPost = (url, opt?) => {
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    })
  }
  // httpTest(){
  //   return this.http.post('/api/affair/type/affairs',{});
  // }
  setTitle(name){
    this.titleService.setTitle(name);
  }
  navTo(url){
    this.route.navigateByUrl(url);
  }

  getLocalStorageItem(key){
    return this.localStorageService.getItem(key);
  }
  setLocalStorageItem(key, value){
    return this.localStorageService.setItem(key, value);
  }
}
