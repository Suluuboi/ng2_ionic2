import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../../../../_core/service/_config-service/local-storage.service';


@Injectable()
export class ResumePreviewService {
  constructor(
    private http: HttpClient,
    private titleService: Title
  ){}
  
  // 查看个人简历、简历预览
  getResumeInfoPreview(opt){
    return this.HttpClientPost('/api/resume', opt).then(res=>{
      return res;
    })
  }

  // 封装http请求
  HttpClientPost = (url, opt?) =>{
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    })
  }
  setTitle = (name) =>{
    this.titleService.setTitle(name);
  }
}