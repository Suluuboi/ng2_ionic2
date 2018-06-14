import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';

@Injectable()
export class LawsInfoService {

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private localStorageService: LocalStorageService
  ) {}

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
    })
  }
  setTitle (name){
      this.titleService.setTitle(name);
  }
}
