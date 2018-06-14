import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';


@Component({
  selector: 'app-job-fair-form',
  templateUrl: './job-fair-form.component.html',
  styleUrls: ['./job-fair-form.component.css']
})
export class JobFairFormComponent implements OnInit {
  public jobfairOper = '创建招聘会';
  public jobfairInfo;
  public jobfairId;
  @Input() jobFairManage;

  @Input()
  set jobFairId(value){
    this.jobfairId = value;
  }

  @Output() jobFairInfos:EventEmitter<any> = new EventEmitter;

  jobFairManageForm: FormGroup;
  public JobFairOptions = {
    proposer         : '',
    start_time       : '',
    end_time         : '',
    address          : '',
    title            : '',
    applicant_type   : '',
    job_type         : '',
    company_count    : '',
    proposer_phone   : '',
    contact          : ''
  };
  public editJobFairInfo = {
    proposer         : '',
    range_time       : [],
    address          : '',
    title            : '',
    applicant_type   : '',
    job_type         : '',
    company_count    : '',
    proposer_phone   : '',
    contact          : ''
  }

  constructor(
    private fb: FormBuilder,
    private companyInfoService: CompanyInfosService
  ) { }

  ngOnInit() {
    if( this.jobFairManage === 'createJobFair'){
      this.companyInfoService.setTitle('创建招聘会-单位后台管理');
    }else{
      this.companyInfoService.setTitle('招聘会信息编辑');
      this.jobfairOper = '更新招聘会';
      this.getJobfairDetailInfos(this.jobfairId);
    }
    this.jobFairManageForm = this.fb.group({
      proposer         : [ null, [Validators.required]],//单位名称
      range_time         : [ null, [Validators.required] ],
      address          : [ null, [Validators.required]],//举办地点
      title            : [ null, [Validators.required]],//举办主题
      applicant_type   : [ null, [Validators.required]],//求职人员类别
      job_type         : [ null, [Validators.required]],//意向性岗位种类
      company_count    : [ null, [Validators.required]],//进场企业数
      contact          : [ null, [Validators.required]],//联系人
      proposer_phone   : [ null, [ Validators.required ] ]//联系电话
    });
  }
  // 获取招聘会信息
  getJobfairDetailInfos(id){
    this.companyInfoService.editJobfairInCompanyAdmin({fair_id: id}).then(res=>{
      if(res['code'] === 1){
        this.JobFairOptions = res['data'];
        this.dealWidthOptions();
      }else{
        this.companyInfoService.showMessage('error', '数据获取失败，刷新后重试！');
      }
    })
  }

  dealWidthOptions = () => {
    let start_time = new Date(this.JobFairOptions['start_time']);
    let end_time   = new Date(this.JobFairOptions['end_time']);
    this.editJobFairInfo = Object.assign(this.editJobFairInfo, this.JobFairOptions);
    delete this.editJobFairInfo['start_time'];
    delete this.editJobFairInfo['end_time'];
    this.editJobFairInfo.range_time = [start_time, end_time];
    this.setFormDefaultValue(this.editJobFairInfo);
  }

  _submitForm() {
    for (const i in this.jobFairManageForm.controls) {
      this.jobFairManageForm.controls[ i ].markAsDirty();
    }
    
    if(this.jobFairManageForm.valid){
      this.dealWidthJobFairTime(this.jobFairManageForm.value.range_time);
    }
  }

  setFormDefaultValue = (option) => {
    this.jobFairManageForm.setValue({
      proposer       : option.proposer,
      range_time     : option.range_time,
      address        : option.address,
      title          : option.title,
      applicant_type : option.applicant_type,
      job_type       : option.job_type,
      company_count  : option.company_count,
      contact        : option.contact,
      proposer_phone : option.proposer_phone
    })
  }

  dealWidthJobFairTime = (rangeTime) => {
    this.JobFairOptions.start_time = this.filterTime(rangeTime[0]);
    this.JobFairOptions.end_time = this.filterTime(rangeTime[1]);
    this.JobFairOptions = Object.assign(this.JobFairOptions, this.jobFairManageForm.value);
    delete this.JobFairOptions['range_time'];  // 删除表单的range_time 属性
    this.jobFairInfos.emit(this.JobFairOptions);
  }

  filterTime(value) {
    let d = new Date(value);
    let _time = this.dealDateWith(d);
    return _time;
  }


  getFormControl(name) {
    return this.jobFairManageForm.controls[ name ];
  }


  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
}
