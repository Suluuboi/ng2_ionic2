import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigInfoService } from '../../../../_core/service/_config-service/config-info.service';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  userResumeForm: FormGroup;

  // 期望城市

  public salary: Array<any>;// 薪资数组
  public jobTypes: Array<any>;// 职位类别

  constructor(
    private fb: FormBuilder,
    private configInfoService: ConfigInfoService,
    private userInfosService: UserInfosService
  ) { }

  ngOnInit() {
    this.setDefaultValue();//初始化默认配置信息
    // 初始化表单
    this.userResumeForm = this.fb.group({
      resumeName: [null, [Validators.required]],//简历名称
      jobsName: [null, [Validators.required]],//期望职位
      jobNature: [null, [Validators.required]],//工作性质
      jobsAddr: [null, [Validators.required]],//期望工作城市
      jobsSalary: [null, [Validators.required]],//期望薪资

    });
  }

  getJobjobsAddress(value) {
    this.userResumeForm.patchValue({
      jobsAddr: value.city_id
    });
  }

  _submitUserResumeForm() {
    // 本地存储简历信息。
    for (const i in this.userResumeForm.controls) {
      this.userResumeForm.controls[i].markAsDirty();
    }
    if (this.userResumeForm.status == "VALID") {
      let opt = this.userResumeForm.value;
      this.userInfosService.addResume(opt).then(res => {
        if (res['code'] === 1) {
          this.userInfosService.showMessage('success', '简历创建成功');
          this.userInfosService.navTo('/userAdmin/resume/edit/' + res['data'].id);
        }else {
          this.userInfosService.showMessage('error', '简历创建失败！');
        }
      })
    }
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.userResumeForm.controls[name];
  }

  setDefaultValue() {
    // 获取薪资
    if (this.userInfosService.getLocalStorageItem('salary')) {
      this.salary = this.userInfosService.getLocalStorageItem('salary');
    } else {
      this.configInfoService.getSalaryInfo().then(res => {
        return this.salary = res;
      })
    }

    // 职位类型
    if (this.userInfosService.getLocalStorageItem('job_type')) {
      this.jobTypes = this.userInfosService.getLocalStorageItem('job_type');
    } else {
      this.configInfoService.getJobTypeInfo().then(res => {
        return this.jobTypes = res;
      })
    }
  }
}