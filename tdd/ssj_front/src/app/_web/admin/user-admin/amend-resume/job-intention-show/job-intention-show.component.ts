import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigInfoService } from '../../../../../_core/service/_config-service/config-info.service';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-job-intention-show',
  templateUrl: './job-intention-show.component.html',
  styleUrls: ['./job-intention-show.component.css']
})
export class JobIntentionShowComponent implements OnChanges, OnInit {
  public salary: Array<any>;// 薪资数组
  public jobTypes: Array<any>;// 职位类别
  public intentionExp = {};//求职意向经历
  public default_address : any[] ;// 设置默认的意向城市
  public _addr = ""; // 保存省市字符串、 意向城市(从子组件获取的值)

  // 期望城市
  public jobs_addr:any;//工作地点
  public intentionForm: FormGroup;//求职意向经历表单
  public isAddIntentionExp = false;// 求职意向
  public isData = false;

  @Input()
  resumeId;

  @Input()
  set jobIntention(value){
    let isNull = false;
    for(let i in value){
      isNull = true;
      break;
    }
    if(isNull){
      this.isData = true;
      this.jobs_addr = [
        {label: value.area[0].name, value: value.area[0].name},
        {label: value.area[1].name, value: value.area[1].name}
      ];
      this._addr = value.area[0].name + "/" + value.area[1].name;
      this.intentionExp = {
        name: value.name, //机构名称
        job_name: value.job_name, //专业
        job_type_id: value.job_type_id,//工作性质
        city_id:  value.city_id,//期望工作城市
        salary_id:  value.salary_id,//期望薪资
        job_addr : this._addr,
        default_address : this.jobs_addr
      }
    }
  }
  constructor(
    private fb:FormBuilder,
    private userInfosService: UserInfosService,
    private configInfoServcie : ConfigInfoService
  ) { }

  ngOnChanges(){
    // this.getEducationExp();
  }

  ngOnInit() {
    // 获取所有的薪资、 职位类型数据
    if(this.userInfosService.getLocalStorageItem('salary')){
      this.salary = this.userInfosService.getLocalStorageItem('salary');
    }else{
      this.configInfoServcie.getSalaryInfo().then(res=>{
        return this.salary = res;
      })
    }
    if(this.userInfosService.getLocalStorageItem('job_type')){
      this.jobTypes = this.userInfosService.getLocalStorageItem('job_type');
    }else{
      this.configInfoServcie.getJobTypeInfo().then(res=>{
        return this.jobTypes = res;
      })
    }

    // 获取所有的薪资、 职位类型数据
    this.intentionForm = this.fb.group({
      name: [null , [Validators.required]],//简历名称
      job_name: [null , [Validators.required]],//期望职位
      job_type_id:[null , [Validators.required]],//工作性质
      city_id: [null , [Validators.required]],//期望工作城市
      salary_id: [null , [Validators.required]]//期望薪资
    });
  }

  _submitForm(){
    for (const i in this.intentionForm.controls) {
      this.intentionForm.controls[i].markAsDirty();
    }

    this.userInfosService.updateJobIntention(this.intentionForm.value, this.resumeId).then(res=>{
      if(res['code'] === 1){
        // 将返回值处理成对应的 string 显示到页面上
        let _option = this.intentionForm.value;
        this.intentionExp = {
          "name": _option.name, //机构名称
          "job_name": _option.job_name, //专业
          "job_type_id": _option.job_type_id,//工作性质
          "city_id":  _option.city_id,//期望工作城市
          "salary_id":  _option.salary_id,//期望薪资
          'job_addr' : this._addr,
          "default_address" : this.jobs_addr
        }
      }
    })
  }

  getJobjobsAddress(value){
    let _parent = value.parent;
    this.jobs_addr = [
      {label: _parent.label, value: _parent.value},
      {label: value.label, value: value.value}
    ];
    this._addr = _parent.value + "/" + value.value;
    this.intentionForm.patchValue({
      city_id : value.city_id
    });
  }
  
  getFormControl(name) {
    return this.intentionForm.controls[ name ];
  }

  // 给表单设置默认值
  setFormDefaultValue(opt){
    // 将意向城市传递给子组件
    this.default_address = opt.default_address;

    this.intentionForm.setValue({
      "name": opt.name, //机构名称
      "job_name": opt.job_name, //专业
      "job_type_id": parseInt(opt.job_type_id),//工作性质
      "city_id":  parseInt(opt.city_id),//期望工作城市
      "salary_id":  parseInt(opt.salary_id)//期望薪资
    })
  }
  handleOk = (e) => {
    if(this.intentionForm.status === 'INVALID'){
      return false;
    }
    this._submitForm();
    // 关闭当前模态框表单
    this.isAddIntentionExp = false;
  }

  handleCancel = (e) => {
    this.isAddIntentionExp = false;
  }
  showModal = (e) => {
    this.isAddIntentionExp = true;
    this.setFormDefaultValue(this.intentionExp);
  }
}
