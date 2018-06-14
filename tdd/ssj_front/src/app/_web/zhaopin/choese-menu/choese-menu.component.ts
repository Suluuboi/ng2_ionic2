import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ConfigInfoService } from '../../../_core/service/_config-service/config-info.service';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';

// 创建搜索内容的一个类别
export class SearchOptions{
  name: string;
  province_id: number;
  city_id: number;
  district_id: number;
  first_position_id:number;
  second_position_id:number;
  third_position_id:number;
  experience_id: number;
  education_id: number;
  industry_id: number;
  salary_id: number;
  type_id: number;
  order: string;// 排序： 默认， 有变化，传zx(最新)
}
@Component({
  selector: 'choese-menu',
  templateUrl: './choese-menu.component.html',
  styleUrls: ['./choese-menu.component.css']
})
export class ChoeseMenuComponent implements OnChanges, OnInit {
  public province = []; // 省份
  public cities = []; // 市级城市
  public district = []; // 区级城市
  public experience;
  public collages;
  public industry;
  public salary;
  public jobCategory;
  public isMoreJobtype :Boolean = true;// 更多的职位类别选择
  public isMoreDistrict :Boolean = false;
  public jobType = []; //  一级职位类别
  public jobTypeChild = []; // 二级职位类别
  public jobTypeGrandChild = []; // 三级职位类别
  // 筛选条件绑定的值
  provinceValue : string = '';// 四川
  citiesValue : string = ''; // 成都
  districtValue : string = '';
  jobTypeValue: string = ''; // 一级职位类别 id
  jobTypeChildValue: string = '0'; // 二级职位类别 id
  jobTypeGrandChildValue: string = '0'; // 三级职位类别 id
  workExpValue:string = '0';
  degreeValue:string = '0';
  industryValue:string = '0';
  sortValue:string = '0';
  // 设置默认下拉选项
  // 月薪
  salaryValue = 0;
  // 工作性质.
  jobClassValue = 0;

  public options: SearchOptions={
    name: '',
    province_id: null,
    city_id: null,
    district_id: null,
    first_position_id:null,
    second_position_id:null,
    third_position_id:null,
    experience_id: null,
    education_id: null,
    industry_id: null,
    salary_id: 0,// 取默认值
    type_id: 0,
    order: '0'
  }
  @Input() searchOptionsIsNull:Boolean;
  // 将 options 传递给父组件
  @Output('searchOptions')
  searchContent:EventEmitter<any> = new EventEmitter();
  
  public searchName: string; // 职位名称搜索
  
  constructor(
    private configInfoService: ConfigInfoService,
    private localStorageService: LocalStorageService
  ) {
    this.setDefaultValue();
  }

  ngOnChanges(){
    if(this.searchOptionsIsNull){
      this.options = {
        name: '',
        province_id: 0,
        city_id: 0,
        district_id: 0,
        first_position_id:0,
        second_position_id:0,
        third_position_id:0,
        experience_id: 0,
        education_id: 0,
        industry_id: 0,
        salary_id: 0,// 取默认值
        type_id: 0,
        order: '0'
      }
    }
    this.options.name = this.searchName;
    this.transmitOptions(this.options);
  }
  ngOnInit() {
    
  }
  
  // 省份变化时，调用接口
  provinceChange(value){
    this.provinceValue = value;
    if(this.options['province_id'] == value){
      return false;
    }else if(value == 0){
      this.options['province_id'] = null;
      this.options['city_id'] = null;
      this.options['district_id'] = null;
      this.citiesValue  = '0';
      this.districtValue = '0';
      this.cities  = [];
    }else{
      this.options['province_id'] = value;
      this.configInfoService.getCitiesAndDistrictInfo(this.provinceValue).then(res=>{
        this.cities  = res;
        this.options['city_id'] = null;
        this.options['district_id'] = null;
        this.citiesValue  = '0';
      })
    }
    this.transmitOptions(this.options);
    this.district = [];
  }

  // 市级城市发生变化时，调用接口获取区数据
  citiesChange(value){
    this.citiesValue = value;
    if(this.options['city_id'] == value){
      return false;
    }else if(value == 0){
      this.options['city_id'] = null;
      this.options['district_id'] = null;
      this.districtValue = '0';
    }else{
      this.options['city_id'] = value;
      this.configInfoService.getCitiesAndDistrictInfo(this.citiesValue).then(res=>{
        this.district  = res;
        this.options['district_id'] = null;
        this.districtValue = '0';
      })
    }
    this.transmitOptions(this.options);
  }
  // 区变化时，调用接口
  districtChange(value){
    this.districtValue = value;
    if(this.options['district_id'] == value){
      return false;
    }else{
      this.options['district_id'] = value;
      this.transmitOptions(this.options);
    }
  }
  // 条件重置
  defaultSearchOptions(attr){
    this.options[attr] = null;
    this.transmitOptions(this.options);
  }

  // 职位类别各级变化
  jobTypeChange(value){
    this.jobTypeValue = value;
    if(this.options['first_position_id'] == value){
      return false;
    }else if(value == 0){
      this.options['first_position_id'] = null;
      this.options['second_position_id'] = null;
      this.options['third_position_id'] = null;
      this.jobTypeChildValue  = '0';
      this.jobTypeGrandChildValue = '0';
      this.jobTypeChild  = [];
    }else{
      this.options['first_position_id'] = value;
      this.configInfoService.getPositionTypeInfosChild(this.jobTypeValue).then(res=>{
        this.jobTypeChild  = res;
        this.isMoreJobtype = false;
      })
    }
    this.transmitOptions(this.options);
    this.jobTypeGrandChild = [];
  }
  // 二级职位类别变化
  childTypeChange(value){
    this.jobTypeChildValue = value;
    if(this.options['second_position_id'] == value){
      return false;
    }else if(value == 0){
      this.options['second_position_id'] = null;
      this.options['third_position_id'] = null;
      this.jobTypeGrandChildValue = '0';
    }else{
      this.options['second_position_id'] = value;
      this.configInfoService.getPositionTypeInfosChild(this.jobTypeChildValue).then(res=>{
        this.jobTypeGrandChild  = res;
        this.isMoreJobtype = true;
      })
    }
    this.transmitOptions(this.options);
  }
  // 三级职位类别变化
  grandChildTypeChange(value){
    this.jobTypeGrandChildValue = value;
    if(this.options['third_position_id'] == value){
      return false;
    }else if(value == 0){
      this.options['third_position_id'] = null;
    }else{
      this.options['third_position_id'] = value;
    }
    this.transmitOptions(this.options);
  }
  workExpChange(value){
    if(this.options['experience_id'] == value){
      return false;
    }else{
      this.options['experience_id'] = value;
      this.transmitOptions(this.options);
    }
  }
  workExpSelectChange(value){
    this.workExpValue = value;
    this.options['experience_id'] = value;
    this.transmitOptions(this.options);
  }
  degreeChange(value){
    if(this.options['education_id'] == value){
      return false;
    }else{
      this.options['education_id'] = value;
      this.transmitOptions(this.options);
    }
  }
  degreeSelectChange(value){
    this.degreeValue = value;
    this.options['experience_id'] = value;
    this.transmitOptions(this.options);
  }
  industryChange(value){
    this.industryValue = value;
    if(this.options['industry_id'] == value){
      return false;
    }else if(value == 0){
      this.options['industry_id'] = null;
    }else{
      this.options['industry_id'] = value;
    }
    this.transmitOptions(this.options);
  }
  sortValueChange(value){
    if(this.sortValue == value){
      return false;
    }else{
      this.options['order'] = this.sortValue;
      this.transmitOptions(this.options);
    }
  }
  defaultChange(){
    if(this.sortValue == this.options['order']){
      return false;
    }else{
      this.options['order'] = this.sortValue;
      this.transmitOptions(this.options);
    }
  }
  salaryValueChange(value){
    this.salaryValue = value;
    if(this.salaryValue == this.options['salary_id']){
      return false;
    }else{
      if(this.salaryValue == 0 ){
        this.options.salary_id = null;
      }else{
        this.options.salary_id = this.salaryValue;
      }
      this.transmitOptions(this.options);
    }
  }
  jobClassChange(value){// 工作性质
    this.jobClassValue = value;
    if(this.jobClassValue == this.options['type_id']){
      return false;
    }else{
      if(this.jobClassValue == 0 ){
        this.options.type_id = null;
      }else{
        this.options.type_id = this.jobClassValue;
      }
      this.transmitOptions(this.options);
    }
  }

  // 搜素框的键盘事件
  searchValueChange(e){
    if(e.keyCode === 13){
      this.searchJobsList();
    }
  }
  // 搜索框的按钮事件
  searchJobsList(){
    this.options['name'] = this.searchName;
    this.transmitOptions(this.options);
  }
  // 封装方法将this.options的值传递到父组件
  transmitOptions = (opt) => {
    return this.searchContent.emit(opt);
  }

  setDefaultValue = ()=>{
    // 配置省级城市
    if(this.localStorageService.getItem('province')){
      this.province = this.localStorageService.getItem('province');
    }else{
      this.configInfoService.getProvinceForJobs().then(res=>{
        this.province = res;
      })
    }
    this.provinceValue = '四川';
    
    // 配置工作经验要求，
    if(this.localStorageService.getItem('com_exp')){
      this.experience = this.localStorageService.getItem('com_exp');
    }else{
      this.configInfoService.getexperienceInfos().then(res=>{
        this.experience = res;
      })
    }
    // 配置学历要求，
    if(this.localStorageService.getItem('degree')){
      this.collages = this.localStorageService.getItem('degree');
    }else{
      this.configInfoService.getDegreeInfo().then(res=>{
        this.collages = res;
      })
    }
    // 配置行业领域，
    if(this.localStorageService.getItem('industry')){
      this.industry = this.localStorageService.getItem('industry');
    }else{
      this.configInfoService.getindustryInfos().then(res=>{
        this.industry = res;
      })
    }
    // 薪资要求
    if(this.localStorageService.getItem('salary')){
      this.salary = this.localStorageService.getItem('salary');
    }else{
      this.configInfoService.getSalaryInfo().then(res=>{
        this.salary = res;
      })
    }
    // 工作性质
    if(this.localStorageService.getItem('job_type')){
      this.jobCategory = this.localStorageService.getItem('job_type');
    }else{
      this.configInfoService.getJobTypeInfo().then(res=>{
        this.jobCategory = res;
      })
    }
    // 职位类别信息配置
    if(this.localStorageService.getItem('first_position_type')){
      this.jobType = this.localStorageService.getItem('first_position_type');
    }else{
      this.configInfoService.getPositionTypeInfosParent().then(res=>{
        if(res.code === 1){
          this.jobType = res.data;
        }
      })
    }
  }
}
