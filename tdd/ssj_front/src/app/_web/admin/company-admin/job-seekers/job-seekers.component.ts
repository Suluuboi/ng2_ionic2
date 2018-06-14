import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfigInfoService } from '../../../../_core/service/_config-service/config-info.service';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.css']
})
export class JobSeekersComponent implements OnInit {
//人才搜索内容
  public options = new Object({
    name : '',
    city_id: null,
    start_time: '',
    end_time: '',
    salary_id: null,
    experience_id: null,
    sex: '',
    education_id: null,
    page: null
  });
  public jobSalaryArr = [];
  public minDegreeArr = [];
  public workExpArr = [];

  // 人才列表数组
  public usersInfos = [];// 保存返回的人才列表数组
  public _isUsers = false;// 搜索到的人才列表是否为空
  public _loading = true; // 显示加载中样式
  public dataList:object = {}; //职位列表的所有信息：包含总数，分页，链接等
  public seekersForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private configInfoService : ConfigInfoService,
    private companyInfoService: CompanyInfosService
  ) { }

  ngOnInit() {
    this.getPeopleInfoList();
  // 薪资待遇
    if(this.companyInfoService.getLocalStorageItem('salary')){
      this.jobSalaryArr = this.companyInfoService.getLocalStorageItem('salary');
    }else{
      this.configInfoService.getSalaryInfo().then(res=>{
        if(res){
          this.jobSalaryArr = res;
        }
      })
    }
  // 薪资待遇
  // 学历要求
    if(this.companyInfoService.getLocalStorageItem('degree')){
      this.minDegreeArr = this.companyInfoService.getLocalStorageItem('degree');
    }else{
      this.configInfoService.getDegreeInfo().then(res=>{
        if(res){
          this.minDegreeArr = res;
        }
      })
    }
  // 学历要求
  // 单位发布职位对工作经验要求
    if(this.companyInfoService.getLocalStorageItem('com_exp')){
      this.workExpArr = this.companyInfoService.getLocalStorageItem('com_exp');
    }else{
      this.configInfoService.getexperienceInfos().then(res=>{
        if(res){
          this.workExpArr = res;
        }
      })
    }
  // 单位发布职位对工作经验要求
    this.seekersForm = this.fb.group({
      name: [null],//职位类别
      city_id: [ null ],//工作地点(省市级联)
      salary_id : [ 'all'],//薪资待遇
      start_time: [ null ],//更新时间
      end_time: [ null ],//更新时间
      // 补充信息(其它内容)
      experience_id: [ 'all'],//工作经验
      education_id: ['all'],//学历要求
      sex: [ 'all' ],//  性别要求
    });
  }

  searchSeekers() {
    for (const i in this.seekersForm.controls) {
      this.seekersForm.controls[i].markAsDirty();
    }
    this.options = Object.assign(this.options, this.seekersForm.value);
    this.getPeopleInfoList(this.options);
  }


  // 页码变化
  pageChangeClick(value){
    this.options['page'] = value;
    this.getPeopleInfoList(this.options);
  }

  getPeopleInfoList(opt?){
    if(opt && opt.salary_id == 'all'){
      opt.salary_id = null;
    }
    if(opt && opt.experience_id == 'all'){
      opt.experience_id = null;
    }
    if(opt && opt.education_id == 'all'){
      opt.education_id = null;
    }
    if(opt && opt.sex == 'all'){
      opt.sex = null;
    }
    this.companyInfoService.searchPeopleInfoList(opt).then(res=>{
      this._loading = false;
      if(res['code'] === 1){
        this._loading = false;
        if(res['data'].constructor !== Array){
          this.dataList = res['data'];
          this.usersInfos = this.dataList['data'];
          this._isUsers = false;
        }else{
          this.dataList = {};
          this.usersInfos = [];
          this._isUsers = true;
        }
      }else{
        this._isUsers = false;
      }
    })
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.seekersForm.controls[name];
  }

  // 工作地点
  getJobWorkAddress(value){
    this.seekersForm.patchValue({
      city_id: value.city_id
    })
  }
  getUpdateTime(value){
    let start = null;
    let end = null;
    if(value._startDate){
      let _start = new Date(value._startDate);
      start = this.dealDateWith(_start);
    }
    if(value._endDate){
      let _end = new Date(value._endDate);
      end = this.dealDateWith(_end);
    }
    this.seekersForm.patchValue({
      start_time: start,
      end_time: end
    })
  }

  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }
}
