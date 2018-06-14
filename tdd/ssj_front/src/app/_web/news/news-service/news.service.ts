import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';
import { Title } from '@angular/platform-browser';

@Injectable()
export class NewsService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private route: Router,
    private titleService: Title
  ) { }

  // 获取新闻详情
  getNewsDetail(opt){
    return this.HttpClientPost('/api/article', opt).then(res=>{
      return res;
    })
  }
  // 根据类别获取新闻列表
  getNewsInfoList(opt){
    return this.HttpClientPost('/api/articles', opt).then(res=>{
      return res;
    })
  }
  // 首页上=》最新的欣慰列表信息获取。
  getNewsTypeList(){
    return this.HttpClientPost('/api/categories').then(res=>{
      return res;
    })
  }
  navTo(url){
    this.route.navigateByUrl(url);
  }

  HttpClientPost = (url, opt?) => {
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    })
  }
  setTitle(name){
    this.titleService.setTitle(name);
  }
}
