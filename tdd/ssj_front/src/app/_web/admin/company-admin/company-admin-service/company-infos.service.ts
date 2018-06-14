import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LocalStorageService } from '../../../../_core/service/_config-service/local-storage.service';


@Injectable()
export class CompanyInfosService {
  constructor(
    private http: HttpClient,
    private confirmServ: NzModalService,
    private _message: NzMessageService,
    private localStorageService: LocalStorageService,
    private route : Router,
    private titleService : Title
  ) { }

  // 路由守卫判断用户信息是否填写
  checkUserInfoIsPermission(){
    return this.HttpClientPost('/api/company/check_info').then(res=>{
      return res;
    })
  }
  /******************************************************/
  addJobsToJobfair(opt){
    return this.HttpClientPost('/api/company/fair/add_company_jobs', opt).then(res=>{
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
  // 文件资料上传
  uploadJobfairFiles(opt){
    return this.HttpClientPost('/api/company/fair/save_files', opt).then(res=>{
      return res;
    })
  }

  
  // 单位用户 获取招聘会列表信息
  getJobFairsCompanyAdminInfoList(opt?){
    return this.HttpClientPost('/api/company/fair/fairs', opt).then(res=>{
      return res;
    });
  }
  // 创建招聘会
  createJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/add', opt).then(res=>{
      return res;
    })
  }
  // 招聘会删除
  deletedJobFairsCompanyAdminInfo(opt){
    return this.HttpClientPost('/api/company/fair/delete', opt).then(res=>{
      return res;
    })
  }
  // 更新招聘会 更新信息
  updateJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/update', opt).then(res=>{
      return res;
    })
  }// 编辑招聘会 获取信息
  editJobfairInCompanyAdmin(opt){
    return this.HttpClientPost('/api/company/fair/show', opt).then(res=>{
      return res;
    })
  }
  /******************************************************/
  // 获取单位的信息，填充单位主页数据
  getCompanyHomePageInfos(){
    return this.HttpClientPost('/api/company/dash').then(res=>{
      return res;
    })
  }
  // 获取单位的信息，填充单位主页数据

  // 获取单位位置的经纬度
   getCompanyMapPosition(){
    return this.HttpClientPost('/api/company/map').then(res=>{
      return res;
    })
  }
  // 单位地图位置更新
  saveCompanyMapPosition(opt){
    return this.HttpClientPost('/api/company/map_update', opt).then(res=>{
      return res;
    })
  }

  // 单位简历管理操作中 查看简历操作
  changeResumeStatusViewed(opt){
    return this.HttpClientPost('/api/company/resume/viewed', opt).then(res=>{
      return res;
    })
  }

  // 单位简历管理操作中 待沟通操作
  changeResumeStatusCommunication(opt){
    return this.HttpClientPost('/api/company/resume/awaiting_com', opt).then(res=>{
      return res;
    })
  }
  
  // 单位简历管理操作中 邀请面试
  changeResumeStatusInterview(opt){
    return this.HttpClientPost('/api/company/resume/interview', opt).then(res=>{
      return res;
    })
  }
  // 单位简历管理操作中 拒绝面试（不合适操作）
  changeResumeStatusRefuse(opt){
    return this.HttpClientPost('/api/company/resume/refuse', opt).then(res=>{
      return res;
    })
  }
  // 单位人才搜素
  searchPeopleInfoList(opt?){
    return this.HttpClientPost('/api/company/persons', opt).then(res=>{
      return res;
    })
  }

  // 简历管理
    // 批量删除当前简历
  deletedAnyRecivedResume(opt){
    return this.HttpClientPost('/api/company/resume/delete_all', opt).then(res=>{
      return res;
    })
  }
    // 删除当前简历
  deletedRecivedResume(opt){
    return this.HttpClientPost('/api/company/resume/delete', opt).then(res=>{
      return res;
    })
  }
    // 获取该单位收到的所有简历
  getRecivedResumesInfoList(opt?){
    return this.HttpClientPost('/api/company/resumes', opt).then(res=>{
      return res;
    })
  }
    // 获取当前单位的所有再招职位列表
  getAllPositionList(){
    return this.HttpClientPost('/api/company/resume/jobs').then(res=>{
      return res;
    })
  }
  // 简历管理


// 继续职位招聘
continuePosition(job_id){
    return this.HttpClientPost('/api/company/job/enable',{job_id: job_id}).then(res=>{
      return res;
    })
}
// 删除单个职位信息 参数： job_id: required;
  deletedPositionInfo(job_id){
    return this.HttpClientPost('/api/company/job/delete', {job_id: job_id}).then(res=>{
      return res;
    })
  }

// 刷新单个职位信息 参数： job_id: required;
  refreshPositionInfo(job_id){
    return this.HttpClientPost('/api/company/job/refresh', {job_id: job_id}).then(res=>{
      return res;
    })
  }
// 刷新多个职位信息 参数： job_id: required;
  refreshAllPositionInfo(opt){
    return this.HttpClientPost('/api/company/job/refresh_all', {job_id: opt}).then(res=>{
      return res;
    })
  }

// 延期职位招聘
extendedPosition(opt){
    return this.HttpClientPost('/api/company/job/delay',opt).then(res=>{
      return res;
    })
}
// 延期多个职位信息 参数： job_id: required; delay_time
  extendedAllPositionInfo(opt){
    return this.HttpClientPost('/api/company/job/delay_all', opt).then(res=>{
      return res;
    })
  }

// 暂停职位招聘
pausedPosition(job_id){
  return this.HttpClientPost('/api/company/job/suspend',{job_id: job_id}).then(res=>{
    return res;
  })
}
// 暂停多个职位信息 参数： job_id: required; delay_time
pausedAllPosition(opt){
  return this.HttpClientPost('/api/company/job/suspend_all', {job_id:opt}).then(res=>{
    return res;
  })
}

// 获取单个职位信息
  public jobUrl = '/api/company/job'; // 参数： job_id: required;
  getPositionInfo(job_id){
    return this.HttpClientPost(this.jobUrl, {job_id: job_id}).then(res=>{
      return res;
    })
  }
// 更新当前编辑职位信息
  updatePositionInfo(option){
    return this.HttpClientPost('/api/company/job/update', option).then(res=>{
      return res;
    })
  }
  
// 新建职位信息
  public addJobsUrl = '/api/company/job/add'; // 发布职位
  public jobsListUrl = '/api/company/jobs'; //获取职位列表 参数 name： 搜索内容； page: 页数

  getPositionListInfos(opt){
    return this.HttpClientPost(this.jobsListUrl, opt).then(res=>{
      return res;
    })
  }

  addPositionInfos(opt){
    return this.HttpClientPost(this.addJobsUrl, opt).then(res=>{
      return res;
    })
  }

// 新建职位信息 

// 更新、修改单位基本资料
  public addInfoUrl = '/api/company/add'; //更新单位资料
  public getInfoUrl = '/api/company/user_info'; //获取单位资料

  getCompanyBaseInfos(){
    return this.HttpClientPost(this.getInfoUrl, {}).then(res=>{
      return res;
    })
  }
  updateCompanyInfo(opt){
    return this.HttpClientPost(this.addInfoUrl, opt).then(res=>{
      return res;
    })
  }

// 更新、修改单位基本资料
// 获取单位logo
getPhotoPic(){
  return this.HttpClientPost('/api/company/logo').then(res=>{
    return res;
  })
}
//上传头像，图片文件
public photo_url = '/api/company/add_logo_pic'; //上传头像，图片文件
postPhotoPic(opt){
  return this.HttpClientPost(this.photo_url, opt).then(res=>{
    return res;
  })
}
//上传头像，图片文件

// 会议室管理
  addConferenceRoom(opt){
    let url = '/api/company/add_roominfo';
    return this.HttpClientPost(url, opt).then(res=>{
      return res;
    })
  }
  getConferenceRoomList(){
    let url = '/api/company/roominfo';
    return this.HttpClientPost(url).then(res=>{
      return res;
    })
  }
  deletedConferenceRoomList(){
    let url = '/api/company/delete_room';
    return this.HttpClientPost(url).then(res=>{
      return res;
    })
  }
  cleanConferenceRoomList(){
    let url = '/api/company/clean_room';
    return this.HttpClientPost(url).then(res=>{
      return res;
    })
  }

  HttpClientPost = (url, opt?)=>{
    return this.http.post(url, opt).toPromise().then(res=>{
      if(res['code'] === 401){
        this.navTo('login');
      }else if(res['code'] === 403){
        this.navTo('error');
      }
      return res;
    }).catch(error => {
      this.navTo('/companyAdmin');
      this.showMessage('warning', '请求错误，刷新后重试或者联系网站管理员！');
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
      okText: opt.okText ? opt.okText : '确定',
      onOk: opt.ok,
      cancelText: opt.cancelText ? opt.cancelText : "",
      onCancel: opt.cancel ? opt.cancel : ''
    });
  }

  error(opt) {
      this.confirmServ.error({
          title: opt.title,
          content: opt.content,
          onOk : opt.ok
      });
  }

  // 操作状态提示 success, error , warning , info ....and so on 
  showMessage = (type, text) => {
    this._message.create(type, text);
  };
  
  // localstorage set data
  setLocalStorageItem(key, value){
    this.localStorageService.setItem(key, value);
  }
  getLocalStorageItem(key){
    return this.localStorageService.getItem(key);
  }
  // set Title
  setTitle(name){
    this.titleService.setTitle(name);
  }
}