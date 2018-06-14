import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'job-fair',
  templateUrl: './job-fair.component.html',
  styleUrls: ['./job-fair.component.css']
})
export class JobFairComponent implements OnInit {
  
  @Input()
  userType;

  public jobTheme = "";
  public _startDate = null;
  public _endDate = null;

  public jobFairs = [];
  public isJobFairs: Boolean = false;//是否有招聘会列表信息

  _data = {}; // 异步数据 res.data
  _dataSet = [];// 异步数据列表（数组）
  _loading:boolean = true;
  _anyCompanys:boolean = false;

  constructor(
    private modalService: NzModalService,
    private companyInfoService: CompanyInfosService
  ) { }

  ngOnInit() {
    this.getJobFairsList();
  }

  // 获取招聘会信息列表
  getJobFairsList(opt?) {
    this.companyInfoService.getJobFairsCompanyAdminInfoList(opt).then(res=>{
      this._loading = true;
      if(res['code'] === 1){
        this._loading = false;
        this._anyCompanys = false;
        this._data = res['data'];
        this._dataSet = this._data['data'];
      }else{
        this._anyCompanys = true;
      }
    })
  }

  // 页码变化
  pageChangeClick(value) {
    this.getJobFairsList({ page: value });
  }

  showModalForComponent(id) {
    const subscription = this.modalService.open({
      title          : '文件资料上传',
      content        : UploadFileComponent,
      onOk() {
        // console.log('Click Ok');
      },
      onCancel() {
        // console.log('Click cancel');
      },
      footer         : false,// 打开关闭 取消 、 确定按钮
      componentParams: {
        id: id
      }
    });
    subscription.subscribe(result => {
      // console.log(result);
    })
  }

  // 路由到公司列表页面
  jobFairCompanyAdd = (jobFair_id) =>{
    this.companyInfoService.navTo('/companyAdmin/jobFair/companyAdd/' + jobFair_id);
  }
  // 路由到意向性协议页面
  navToIntention = (id) =>{
    this.companyInfoService.navTo('/companyAdmin/jobFairIntention/' + id);
  }
  // 删除当前招聘会信息
  cancelDeletedJobfairs = function () {
    this.companyInfoService.showMessage('info', '取消删除招聘会');
  };

  deletedJobfairInfos = (i, id) => {
    this.companyInfoService.deletedJobFairsCompanyAdminInfo({fair_id: id}).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this._dataSet.splice(i,1);
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  };
  
  jobFairSearch() {
    let start = null;
    let end = null;
    if (this._startDate) {
      let _start = new Date(this._startDate);
      start = this.dealDateWith(_start);
    }
    if (this._endDate) {
      let _end = new Date(this._endDate);
      end = this.dealDateWith(_end);
    }
    let option = {
      title: (this.jobTheme).trim(),
      start_time: start,
      end_time: end
    }
    this.getJobFairsList(option);
  }
  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }

  // 对日历控件值的设置
  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };
  get _isSameDay() {
    return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this._startDate.getHours()) {
          return this.newArray(this._startDate.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
          return this.newArray(this._startDate.getSeconds());
        }
        return [];
      }
    }
  }
}