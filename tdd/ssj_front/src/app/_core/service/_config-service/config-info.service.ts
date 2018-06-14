import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ConfigInfoService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  public areaUrl = '/api/setting/area'; // 获取省市级联信息
  public salaryUrl = '/api/setting/salary'; // 获取期望月薪信息
  public jobTypeUrl = '/api/setting/job_type'; //职位类别信息列表
 
  // 获取工作性质
  getJobTypeInfo(){
    return this.HttpClientPost(this.jobTypeUrl, {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('job_type', res['data'], 1);
        return res['data'];
      }else{
        return false;
      }
    });
  }
  
  // 获取薪资信息
  getSalaryInfo (){
    return this.HttpClientPost(this.salaryUrl, {}).then(res => {
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('salary', res['data'], 1);
        return res['data'];
      }else{
        return false;
      }
    })
  }
  
  
// 福利待遇
  getwelfareInfos(){
    return this.HttpClientPost('/api/setting/welfare', {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('welfare', this.dealDataFormat(res['data']), 1);
        return this.dealDataFormat(res['data']);
      }
    })
  }
// 福利待遇
  
// 单位工作经验要求
  getexperienceInfos(){
    return this.HttpClientPost('/api/setting/experience', {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('com_exp', res['data'], 1);
        return res['data'];
      }
    })
  }
// 单位工作经验要求
  
// 单位性质说明（国企、合资等）
  getCompanyStatusInfos(){
    return this.HttpClientPost('/api/setting/company_status', {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('com_status', res['data'], 1);
        return res['data'];
      }
    })
  }
// 单位性质说明（国企、合资等）

// 语言信息列表
  getlanguageInfos(){
    return this.HttpClientPost('/api/setting/lang', {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('lang', this.dealDataFormat(res['data']), 1);
        return this.dealDataFormat(res['data']);
      }
    })
  }
// 语言信息列表

// 获取行业信息列表
  getindustryInfos(){
    return this.HttpClientPost('/api/setting/industry', {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('industry', res['data'], 1);
        return res['data'];
      }else{
        return false;
      }
    })
  }
// 获取行业信息列表
// 获取学历信息
public degreeUrl  = "/api/setting/education"; //学历信息列表
//学历信息列表 
  getDegreeInfo(){
    return this.HttpClientPost(this.degreeUrl, {}).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('degree', res['data'], 1);
        return res['data'];
      }else{
        return false;
      }
    });
  }
// 获取学历信息

// 获取省份信息，配置职位搜索
getProvinceForJobs(){
  return this.HttpClientPost(this.areaUrl,{}).then(res=>{
    if(res['code'] === 1){
      this.localStorage.setItemAnyTime('province', res['data'], 1);
      return res['data'];
    }
  })
}
// 获取市、区一级城市信息
getCitiesAndDistrictInfo(parent_id){
  return this.HttpClientPost(this.areaUrl, { parent_id: parent_id}).then(res=>{
    if(res['code'] === 1){
      return res['data'];
    }
  })
}

//懒加载级联，获取省份信息
  getProvince(){
    let opt = {};
    return this.HttpClientPost(this.areaUrl, opt);
  }

  getCities(parent_id,name, opt){
    return this.HttpClientPost(this.areaUrl, {parent_id: parent_id}).then(res=>{
      if(res['code'] === 1){
        let cities = new Object();
        cities[name] = new Array();
        let city = res['data'];
        city.forEach(element => {
          let _city = new Object();
          _city['value'] = element.name;
          _city['label'] = element.name;
          _city['city_id'] = element.id;
          _city['isLeaf'] = opt.isLeaf;
          cities[name].push(_city);
        });
        return cities;
      }else{
      }
    });
  }

  provinceDataDeal(){
    return this.getProvince().then(res=>{
      if(res['code'] === 1){
        let province = new Array();
        let pro = res['data'];
        pro.forEach(element => {
        let _pro = new Object();
          _pro['value'] = element.name;
          _pro['label'] = element.name;
          _pro['pro_id'] = element.id;
          province.push(_pro);
        });
        this.localStorage.setItemAnyTime('area', province, 1);
        return province;
      }else{
      }
    })
  }
// 懒加载获取职位类别信息 (配置下拉选项信息)
  public positionUrl = '/api/setting/position_type'; //获取职位信息接口参数：parent_id int 上一级数据id（获取顶级数据该参数可为空）
  firstLevelJobsType(){
    return this.HttpClientPost(this.positionUrl);
  }
  childrenJobsType(parent_id,name, opt){
    return this.HttpClientPost(this.positionUrl, {parent_id: parent_id}).then(res=>{
      if(res['code'] === 1){
        let jobTypes = new Object();
        jobTypes[name] = new Array();
        let typeData = res['data'];
        typeData.forEach(element => {
          let _type = new Object();
          _type['value'] = element.name;
          _type['label'] = element.name;
          _type['job_type_id'] = element.id;
          _type['isLeaf'] = opt.isLeaf;
          jobTypes[name].push(_type);
        });
        return jobTypes;
      }
    });
  }

  firstLevelJobsTypeDeal(){//将一级职位信息单独存储
    return this.firstLevelJobsType().then(res=>{
      if(res['code'] === 1){
        let firstJobsType = new Array();
        let type = res['data'];
        type.forEach(element => {
        let _type = new Object();
          _type['value'] = element.name;
          _type['label'] = element.name;
          _type['job_type_id'] = element.id;
          firstJobsType.push(_type);
        });
        this.localStorage.setItemAnyTime('firstJobsType', firstJobsType, 1);
        return firstJobsType;
      }
    })
  }
  // (配置搜索职位处职位类别信息信息)
  getPositionTypeInfosParent(){// 一级职位类别
    return this.HttpClientPost(this.positionUrl).then(res=>{
      if(res['code'] === 1){
        this.localStorage.setItemAnyTime('first_position_type', res['data'], 1);
        return res['data'];
      }
    })
  }
  getPositionTypeInfosChild(parent_id){
    return this.HttpClientPost(this.positionUrl, {parent_id: parent_id}).then(res=>{
      if(res['code'] === 1){
        return res['data'];
      }
    })
  }
// 懒加载获取职位类别信息

  // 请求获取数据, 将http的post请求封装一下。
  HttpClientPost = (url, opt?)=>{
    return this.http.post(url, opt).toPromise().then(res=>{
        return res;
    })
  }

  // 处理获取到的配置信息数据
  dealDataFormat(array: Array<object>){
    let arr = [];
    array.forEach(el=>{
      let _a = {
        label: el['name'],
        value: el['id']
      };
      arr.push(_a);      
    })
    return arr;
  }
}
