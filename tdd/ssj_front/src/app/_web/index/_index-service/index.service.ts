import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';

@Injectable()
export class IndexService {

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private localStorageService: LocalStorageService
  ) {}

  
  getBannerImgList(){
     return this.HttpClientPost('/api/banners').then(res=>{
      return res;
    })
  }
  
  getLatestArticles(opt){
     return this.HttpClientPost('/api/latest_articles', opt).then(res=>{
      return res;
    })
  }
  
  getZphList(opt){
    return this.HttpClientPost('/api/fairs', opt).then(res=>{
      return res;
    })
  }
  
  getNewsList(opt?){
    return this.HttpClientPost('/api/cates', opt).then(res=>{
      return res;
    })
  }
  // 最新职位列表获取
  getJobsList(opt?){
    return this.HttpClientPost('/api/latest_jobs', opt).then(res=>{
      return res;
    })
  }
  // 配置首页的职位类别列表
  getJobTypes(opt?){
    return this.HttpClientPost('/api/types', opt).then(res=>{
      if(res['code'] === 1){
        this.localStorageService.setItemAnyTime('indexJobTypes', res['data'], 1);
        return res['data'];
      }
    })
  }
  // 法律法规
  getLawsList(opt?){
    return this.HttpClientPost('/api/laws', opt).then(res=>{
      return res;
    })
  }
  //获取法律法规详情
  getLawsDetail(opt?){
    return this.HttpClientPost('/api/law', opt).then(res=>{
      return res;
    })
  }
  HttpClientPost = (url, opt?) =>{
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    }).catch(error=>{
      // console.log(error);
    })
  }
  // 对象转为数组
  objToArray = (obj:object) => {
    let arr = [];
    for(let key in obj){
      arr.push(obj[key]);
    }
    return arr;
  }
  setTitle(name){
    this.titleService.setTitle(name);
  }
}
