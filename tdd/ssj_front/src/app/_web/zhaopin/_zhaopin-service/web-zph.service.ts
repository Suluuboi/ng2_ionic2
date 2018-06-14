import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';

@Injectable()
export class ZphService {

  constructor(
    private http: HttpClient,
    private route: Router,
    private confirmServ: NzModalService,
    private _message: NzMessageService,
    private titleService: Title
  ) { }
  // 获取招聘会详情
  getJobFairDetailsInfo(opt){
    return this.HttpClientPost('/api/fair', opt).then(res=>{
      return res;
    })
  }
  // set Title
  setTitle = (name) =>{
    this.titleService.setTitle(name);
  }

  // web获取招聘会列表信息
  jobFairsInfoList(){
    return this.HttpClientPost('/api/fairs').then(res=>{
      return res;
    })
  }
  /********************求职意向登记***********************/
  jobsPositionRegister(opt){
    return this.HttpClientPost('/api/jos_apply/add', opt).then(res=>{
      return res;
    })
  }
  /********************求职意向登记***********************/
 
  
    
  // 创建招聘会
  createJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/add', opt).then(res=>{
      return res;
    })
  }
  // 编辑招聘会 获取信息
  editJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/show', opt).then(res=>{
      return res;
    })
  }
  // 文件资料上传
  uploadJobfairFiles(opt){
    return this.HttpClientPost('/api/company/fair/save_files', opt).then(res=>{
      return res;
    })
  }
  // 更新招聘会 更新信息
  updateJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/update', opt).then(res=>{
      return res;
    })
  }
  // 单位用户 获取招聘会列表信息
  getJobFairsCompanyAdminInfoList(opt?){
    return this.HttpClientPost('/api/company/fair/fairs', opt).then(res=>{
      return res;
    });
  }
  // 招聘会删除
  deletedJobFairsCompanyAdminInfo(opt){
    return this.HttpClientPost('/api/company/fair/delete', opt).then(res=>{
      return res;
    })
  }

  // 意向性协议列表获取
  getIntentionAgreeMents(opt){
    return this.HttpClientPost('/api/company/fair/agreements', opt).then(res=>{
      return res;
    })
  }
  // 修改意向性协议信息
  editIntentionAgreeMents(opt){
    return this.HttpClientPost('/api/company/fair/update_agreement', opt).then(res=>{
      return res;
    })
  }
  // 新增意向性协议信息
  addIntentionAgreeMents(opt){
    return this.HttpClientPost('/api/company/fair/add_agreement', opt).then(res=>{
      return res;
    })
  }
  // 删除意向性协议信息
  deletedIntentionAgreeMents(opt){
    return this.HttpClientPost('/api/company/fair/del_agreement', opt).then(res=>{
      return res;
    })
  }
  // 导入意向性协议
  uploadIntentions(opt){
    return this.HttpClientPost('/api/company/fair/load_agreement_excel', opt).then(res=>{
      return res;
    })
  }
  //  获取协议回访记录
  getIntentionVisitReturn(opt){
    return this.HttpClientPost('/api/company/fair/visit_list', opt).then(res=>{
      return res;
    })
  }
  // 编辑协议回访记录
  addIntentionvisitReturn(opt){
    return this.HttpClientPost('/api/company/fair/add_visit', opt).then(res=>{
      return res;
    })
  }
  // 删除回访记录
  deletedIntentionVisitReturn(opt){
    return this.HttpClientPost('/api/company/fair/del_visit', opt).then(res=>{
      return res;
    })
  }

  /*************单位和岗位添加查询**************/
  searchCompanyToAdd(opt){
    return this.HttpClientPost('/api/company/fair/search_company', opt).then(res=>{
      return res;
    })
  }
  getJobfairsCompanyList(opt){
    return this.HttpClientPost('/api/company/fair/get_fair_company', opt).then(res=>{
      return res;
    })
  }
  addCompanyToJobfair(opt){
    return this.HttpClientPost('/api/company/fair/add_or_del_fair_company', opt).then(res=>{
      return res;
    })
  }
  deleteCompanyToJobfair(opt){
    return this.HttpClientPost('/api/company/fair/add_or_del_fair_company', opt).then(res=>{
      return res;
    })
  }
  getCompanyJobsList(opt){
    return this.HttpClientPost('/api/company/fair/company_jobs', opt).then(res=>{
      return res;
    })
  }
  addJobsToJobfair(opt){
    return this.HttpClientPost('/api/company/fair/add_company_jobs', opt).then(res=>{
      return res;
    })
  }
  /*************单位和岗位添加查询**************/

 
  HttpClientPost = (url, opt?) => {
    return this.http.post(url, opt).toPromise().then(res=>{
      return res;
    })
    // .catch(
    //   error=>{
    //     let error_url = '/error?id='+ error.status;
    //     this.navTo(error_url);
    // })
  }
  success(opt) {
    this.confirmServ.success({
      title: opt.title,
      content: opt.content,
      okText: opt.okText,
      onOk: opt.ok,
      cancelText: opt.cancelText,
      onCancel: opt.cancel
    });
  }

  error(opt) {
      this.confirmServ.error({
          title: opt.title,
          content: opt.content
      });
  }
  
  // 操作状态提示
  showMessage = (type, text) => {
    this._message.create(type, text);
  };

  // 封装路由跳转
  navTo(url){
    this.route.navigateByUrl(url);
  }
}
