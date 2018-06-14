import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LocalStorageService } from '../../../../_core/service/_config-service/local-storage.service';
import { Title } from '@angular/platform-browser';

@Injectable()
export class UserInfosService {

  constructor(
    private http: HttpClient,
    private route: Router,
    private titleService: Title,
    private confirmServ: NzModalService,
    private _message: NzMessageService,
    private localStorageService: LocalStorageService
  ) { }
  // 路由守卫判断用户信息是否填写
  checkUserInfoIsPermission(){
    return this.HttpClientPost('/api/person/check_info').then(res=>{
      return res;
    })
  }

  // 个人中心首页，所有基本信息数据获取
  getBaseInfos(){
    return this.HttpClientPost('/api/person/dash').then(res=>{
      return res;
    })
  }

  // 已收藏的职位管理  个人中心
  getCollectJobsInfoList(){
    return this.HttpClientPost('/api/person/collection_jobs').then(res=>{
      return res;
    })
  }
  // 取消职位收藏
  cancelAppiledJob(opt){
    return this.HttpClientPost('/api/person/collection_delete', opt).then(res=>{
      return res;
    })
  }

  // 谁查看了我的简历
  scanResumeViewedCompanys(){
    return this.HttpClientPost('/api/person/resume_viewed').then(res=>{
      return res;
    })
  }

  // 获取当前已申请的职位列表带搜索
  searchAppliedJobsInfoList(opt){
    return this.HttpClientPost('/api/person/jobs', opt).then(res=>{
      return res;
    })
  }

// 获取当前简历的所有详细信息
  public allInfoUrl = '/api/person/resume/info';// 简历详细信息获取地址

  getResumeAllInfos(opt){
    return this.HttpClientPost(this.allInfoUrl, opt).then(res=>{
      return res;
    })
  }

// 获取当前简历的所有详细信息
// 个人资料更新
  public userInfoUrl = '/api/person/add';  //更新个人基本资料
  public userInfo_url = '/api/person/user_info'; // 获取个人基本资料
  // 获取个人基本资料
  getUserInfos(){
    return this.HttpClientPost(this.userInfo_url, {}).then(res=>{
      let _res = res['data'];
      if(res['code'] === 1 && res['data'] != null){
        return res['data'];
      }else{
        return null;
      }
    })
  }

  //更新个人基本资料
  updateUserInfos(opt){
  // 将学历信息name 替换为对应的id值。
    return this.HttpClientPost(this.userInfoUrl, opt).then(res=>{
      return res;
    })
  }
// 个人资料更新

// 简历创建、刷新、列表获取、删除
  public addReUrl = '/api/person/resume/add'; //创建简历
  public resumeListUrl = '/api/person/resumes'; //获取简历信息列表
  public updateResumeUrl = '/api/person/resume/refresh'; // 刷新简历信息
  public deleteResumeUrl = '/api/person/resume/delete'; //删除当前简历
   //删除当前简历
   deleteResumenInfo(id){
    return this.HttpClientPost(this.deleteResumeUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }

 // 刷新简历信息
 updateResumeInfo(resume_id){
   return this.HttpClientPost(this.updateResumeUrl, {resume_id: resume_id}).then(res=>{
     return res;
   })
 }

 //获取简历信息列表
 getResumeList(){
   return this.HttpClientPost(this.resumeListUrl, {}).then(res=>{
     return res;
   })
 }
 // 设置默认简历
 setDefaultResumeList(opt){
   return this.HttpClientPost('/api/person/resume/set_default', opt).then(res=>{
     return res;
   })
 }

 //创建简历
 addResume(opt){
   let option = new Object();
   option = {
     name: opt.resumeName,  // 简历名称
     job_name: opt.jobsName, // 期望职位
     job_type_id: opt.jobNature, //工作性质
     city_id: opt.jobsAddr, //期望城市
     salary_id: opt.jobsSalary // 期望薪资
   }
   return this.HttpClientPost(this.addReUrl, option).then(res=>{
     return res;
   })
 }

  //  修改简历求职意向
  public intUrl = '/api/person/resume/update'; // 修改求职意向
  updateJobIntention(opt, resume_id){
    opt['resume_id'] = resume_id;
    return this.HttpClientPost(this.intUrl, opt).then(res=>{
      if(res['code'] === 1){
        return res;
      }
    })
  }


// 简历创建、刷新、列表获取、删除

// 修改完善简历工作信息
  public worksUrl = '/api/person/resume/works'; //获取工作经历
  public addWorksUrl = '/api/person/resume/work_add'; // 添加简历工作经历
  public deletWorkUrl = '/api/person/resume/work_delete'; //删除工作经验中的某一项
  public editWorkUrl = '/api/person/resume/work_update'; //编辑工作经验中的某一项
  //删除工作经验中的某一项
  deleteResumeWorksInfo(resume_id, resume_work_id){
  return this.HttpClientPost(this.deletWorkUrl, {resume_id: resume_id, resume_work_id: resume_work_id})
      .then(res=>{
        return res;
      })
  }

  // 添加工作经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeWorksInfo(opt, resume_id, resume_work_id?:number){
    let option = opt;
    option['resume_id'] = resume_id;
    if(resume_work_id){
      option['resume_work_id'] = resume_work_id;
      return this.HttpClientPost(this.editWorkUrl, option).then(res=>{
                  return res;
              })
  }
  return this.HttpClientPost(this.addWorksUrl, option).then(res=>{
            return res;
          })
  }

  // 获取当前简历对应的工作经历
  getResumeWorksInfo(id){
    return this.HttpClientPost(this.worksUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }
// 修改完善简历工作信息

// 修改完善教育信息
  public edusUrl = '/api/person/resume/edus'; //获取教育信息
  public addEduUrl = '/api/person/resume/edu_add'; // 添加简历教育信息
  public deletEduUrl = '/api/person/resume/edu_delete'; //删除教育信息中的某一项
  public editEduUrl = '/api/person/resume/edu_update'; //编辑教育信息中的某一项

  //删除教育经验中的某一项
    deleteResumeEduInfo(resume_id, resume_edu_id){
      return this.HttpClientPost(this.deletEduUrl, {resume_id: resume_id, resume_edu_id: resume_edu_id})
          .then(res=>{
            return res;
          })
    }
  
    // 添加教育经历到简历  编辑都用这个方法，由第三个参数决定
    addResumeEduInfo(opt, resume_id, resume_edu_id?:number){
      let option = opt;
      option['resume_id'] = resume_id;
      if(resume_edu_id){
        option['resume_edu_id'] = resume_edu_id;
        return this.HttpClientPost(this.editEduUrl, option).then(res=>{
                    return res;
                })
      }
      return this.HttpClientPost(this.addEduUrl, option).then(res=>{
                return res;
              })
    }
  
    // 获取当前简历对应的教育经历
    getResumeEduInfo(id){
      return this.HttpClientPost(this.edusUrl, {resume_id: id}).then(res=>{
        return res;
      })
    }
// 修改完善教育信息 
  
// 修改完善简历培训信息
  public trainUrl = '/api/person/resume/trainings'; //获取培训经历
  public addTrainUrl = '/api/person/resume/train_add'; // 添加简历培训经历
  public deletTrainUrl = '/api/person/resume/train_delete'; //删除培训经验中的某一项
  public editTrainUrl = '/api/person/resume/train_update'; //编辑培训经验中的某一项
  //删除培训经验中的某一项
  deleteResumeTrainInfo(resume_id, resume_train_id){
  return this.HttpClientPost(this.deletTrainUrl, {resume_id: resume_id, resume_train_id: resume_train_id})
      .then(res=>{
        return res;
      })
  }

  // 添加培训经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeTrainInfo(opt, resume_id, resume_train_id?:number){
    let option = opt;
    option['resume_id'] = resume_id;
    if(resume_train_id){
      option['resume_train_id'] = resume_train_id;
      return this.HttpClientPost(this.editTrainUrl, option).then(res=>{
                  return res;
              })
    }
    return this.HttpClientPost(this.addTrainUrl, option).then(res=>{
              return res;
            })
  }

  // 获取当前简历对应的培训经历
  getResumeTrainInfo(id){
    return this.HttpClientPost(this.trainUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }
// 修改完善简历培训信息
  
// 修改完善简历项目内容信息
  public projectUrl = '/api/person/resume/projects'; //获取项目内容经历
  public addProjectUrl = '/api/person/resume/project_add'; // 添加简历项目内容经历
  public deletProjectUrl = '/api/person/resume/project_delete'; //删除项目内容经验中的某一项
  public editProjectUrl = '/api/person/resume/project_update'; //编辑项目内容经验中的某一项
  //删除项目内容经验中的某一项
  deleteResumeProjectInfo(resume_id, resume_project_id){
  return this.HttpClientPost(this.deletProjectUrl, {resume_id: resume_id, resume_project_id: resume_project_id})
      .then(res=>{
        return res;
      })
  }

  // 添加项目内容经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeProjectInfo(opt, resume_id, resume_project_id?:number){
    let option = opt;
    option['resume_id'] = resume_id;
    if(resume_project_id){
      option['resume_project_id'] = resume_project_id;
      return this.HttpClientPost(this.editProjectUrl, option).then(res=>{
                  return res;
              })
    }
    return this.HttpClientPost(this.addProjectUrl, option).then(res=>{
              return res;
            })
  }

  // 获取当前简历对应的项目内容经历
  getResumeProjectInfo(id){
    return this.HttpClientPost(this.projectUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }
// 修改完善简历项目内容信息

// 修改完善简历职业技能内容信息
  public skillUrl = '/api/person/resume/skills'; //获取职业技能内容经历
  public addSkillUrl = '/api/person/resume/skill_add'; // 添加简历职业技能内容经历
  public deletSkillUrl = '/api/person/resume/skill_delete'; //删除职业技能内容经验中的某一项
  public editSkillUrl = '/api/person/resume/skill_update'; //编辑职业技能内容经验中的某一项
  //删除职业技能内容经验中的某一项
  deleteResumeSkillInfo(resume_id, resume_skill_id){
  return this.HttpClientPost(this.deletSkillUrl, {resume_id: resume_id, resume_skill_id: resume_skill_id})
      .then(res=>{
        return res;
      })
  }

  // 添加职业技能内容经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeSkillInfo(opt, resume_id, resume_skill_id?:number){
    let option = opt;
    option['resume_id'] = resume_id;
    if(resume_skill_id){
      option['resume_skill_id'] = resume_skill_id;
      return this.HttpClientPost(this.editSkillUrl, option).then(res=>{
                  return res;
              })
    }
    return this.HttpClientPost(this.addSkillUrl, option).then(res=>{
              return res;
            })
  }

  // 获取当前简历对应的职业技能内容经历
  getResumeSkillInfo(id){
    return this.HttpClientPost(this.skillUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }
// 修改完善简历职业技能内容信息

// 修改完善简历其他信息内容信息
  public otherUrl = '/api/person/resume/others'; //获取其他信息内容经历
  public addOtherUrl = '/api/person/resume/other_add'; // 添加简历其他信息内容经历
  public deletOtherUrl = '/api/person/resume/other_delete'; //删除其他信息内容经验中的某一项
  public editOtherUrl = '/api/person/resume/other_update'; //编辑其他信息内容经验中的某一项
  //删除其他信息内容经验中的某一项
  deleteResumeOthersInfo(resume_id, resume_other_id){
  return this.HttpClientPost(this.deletOtherUrl, {resume_id: resume_id, resume_other_id: resume_other_id})
      .then(res=>{
        return res;
      })
  }

  // 添加其他信息内容经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeOthersInfo(opt, resume_id, resume_other_id?:number){
    let option = opt;
    option['resume_id'] = resume_id;
    if(resume_other_id){
      option['resume_other_id'] = resume_other_id;
      return this.HttpClientPost(this.editOtherUrl, option).then(res=>{
                  return res;
              })
    }
    return this.HttpClientPost(this.addOtherUrl, option).then(res=>{
              return res;
            })
  }

  // 获取当前简历对应的其他信息内容经历
  getResumeOthersInfo(id){
    return this.HttpClientPost(this.otherUrl, {resume_id: id}).then(res=>{
      return res;
    })
  }
// 修改完善简历其他信息内容信息

// 修改完善简历自我评价内容信息
  public editSelfUrl = '/api/person/resume/self_update'; //编辑自我评价内容经验中的某一项
  
  // 添加自我评价内容经历到简历  编辑都用这个方法，由第三个参数决定
  addResumeSelfInfo(opt, resume_id){
    let option = opt;
    option['resume_id'] = resume_id;
    return this.HttpClientPost(this.editSelfUrl, option).then(res=>{
              return res;
            })
  }

// 修改完善简历自我评价内容信息

  getPhotoPic(){
      return this.HttpClientPost('/api/person/head_pic').then(res=>{
        return res;
      })
    }
//上传头像，图片文件
  public photo_url = '/api/person/add_head_pic'; //上传头像，图片文件
  postPhotoPic(opt){
    return this.HttpClientPost(this.photo_url, opt).then(res=>{
      return res;
    })
  }
//上传头像，图片文件
  
// 获取当前简历的详细信息
  public currentResumeUrl = '/api/person/resume/info';// 单个简历详细信息
  getCurrentResumeInfos(opt){
    return this.HttpClientPost(this.currentResumeUrl, opt).then(res=>{
      return res;
    })
  }

// 获取当前简历的详细信息

// 查找当前简历id 对应数组中的index
  findIndexInArray(array, key, _id){
    for( let i= 0, l = array.length; i<l; i++){
      if( array[i][key] === _id){
        return i;
      }
    }
  }
// 查找当前简历id 对应数组中的idnex

  // 封装http请求获取数据
  HttpClientPost = (url, opt?) => {
    return this.http.post(url, opt).toPromise().then(res=>{
      if(res['code'] === 401){
        this.navTo('login');
      }else if(res['code'] === 403){
        this.navTo('error');
      }
      return res;
    }).catch(error => {
      this.navTo('/userAdmin');
      this.showMessage('warning', '请求错误，刷新后重试或者联系网站管理员！');
    })
  }

  success(opt) {
    this.confirmServ.success({
      title: opt.title,
      content: opt.content,
      okText: opt.okText?opt.okText: '确定',
      onOk: opt.ok,
      cancelText: opt.cancelText ? opt.cancelText : "",
      onCancel: opt.cancel ? opt.cancel : ''
    });
  }

  error(opt) {
      this.confirmServ.error({
          title: opt.title,
          content: opt.content,
          okText: opt.okText?opt.okText: '确定',
          onOk: opt.ok
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
  // 时间处理方法
  changDatefunction(d){
    let t = new Date(d);
    return t.getFullYear() + '-' + ((t.getMonth() + 1)>9?(t.getMonth() + 1) : '0' + (t.getMonth() + 1)) + '-' + (t.getDate()>9 ? t.getDate() : '0' + t.getDate());
  }
}
