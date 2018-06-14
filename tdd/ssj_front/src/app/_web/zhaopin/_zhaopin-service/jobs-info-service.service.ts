import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';
import { Title } from '@angular/platform-browser';


@Injectable()
export class JobsInfoServiceService {
  constructor(
    private http: HttpClient,
    private confirmServ: NzModalService,
    private _message: NzMessageService,
    private route : Router,
    private localStorageService: LocalStorageService,
    private titleService: Title
  ){}

  // 地图招聘，传递参数为： 四个点的经纬度（经纬度的范围）, 搜索条件（职位名或者公司名 +  查询关键字 ）
  getJobsBasedOnMap(opt){
    return this.HttpClientPost('/api/map/coms', opt).then(res=>{
      return res;
    })
  }

  // 根据单位id获取再招职位信息
  getCompanyJobsInfo(opt){
    return this.HttpClientPost('/api/com/jobs', opt).then(res=>{
      return res;
    })
  }

  // 单位主页预览数据
  getCompanyInfoPreview(opt){
    return this.HttpClientPost('/api/com', opt).then(res=>{
      return res;
    })
  }

  // 查看个人简历、简历预览
  getResumeInfoPreview(opt){
    return this.HttpClientPost('/api/resume', opt).then(res=>{
      return res;
    })
  }

  // 取消收藏职位
  collectPositionDeleted(opt){
    return this.HttpClientPost('/api/person/collection_delete', opt).then(res=>{
      return res;
    })
  }
  // 收藏职位
  collectPositionAdd(opt){
    return this.HttpClientPost('/api/person/collection_add', opt).then(res=>{
      return res;
    })
  }
  // 选择简历，然后投递 
  deliveryResumeForJobs(opt){
    return this.HttpClientPost('/api/person/add_job', opt).then(res=>{
      return res;
    })
  }
  // 投递简历时，获取简历列表
  getResumesList(){
    return this.HttpClientPost('/api/person/job_resumes', {}).then(res=>{
      return res;
    })
  }

  // 职位详情页面、 职位详情获取。参数： job_id
  getJobDetailInfo(job_id){
    let opt = { job_id: job_id};
    return this.HttpClientPost('/api/job', opt).then(res=>{
      return res;
    })
  }
  // 职位列表获取
  getJobsInfos(_opt){
    let opt = _opt || {};
    return this.HttpClientPost('/api/jobs', opt).then(res=>{
      return res;
    })
  }

  // 封装http请求
  HttpClientPost = (url, opt?) =>{
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    })
  }
  // 封装路由跳转
  navTo(url){
    this.route.navigateByUrl(url);
  }
// 封装http请求

  success(opt) {
    this.confirmServ.success({
      title: opt.title,
      content: opt.content,
      onOk: opt.ok,
      cancelText: opt.cancelText ? opt.cancelText : "",
      onCancel: opt.cancel ? opt.cancel : ''
    });
  }
  error(opt) {
      this.confirmServ.error({
          title: opt.title,
          content: opt.content,
          onOk: opt.ok
      });
  }
  warning(opt) {
    this.confirmServ.warning({
      title: opt.title,
      content: opt.content,
      onOk: opt.ok
    });
  }

   // 操作状态提示
   showMessage = (type, text) => {
    this._message.create(type, text);
  };

  // localStorage 
  setLocalStorageItem(key, value){
    this.localStorageService.setItem(key, value);
  }
  getLocalStorageItem(key){
    return this.localStorageService.getItem(key);
  }
  setLocalStorageItemAnyTime(key, value, t){
    this.localStorageService.setItemAnyTime(key, value, t);
  }
  // set Title
  setTitle = (name)=>{
    this.titleService.setTitle(name);
  }
}