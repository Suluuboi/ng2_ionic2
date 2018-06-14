import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigInfoService } from '../../../../../_core/service/_config-service/config-info.service';
import * as moment from 'moment';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-education-experience',
  templateUrl: './education-experience.component.html',
  styleUrls: ['./education-experience.component.css']
})
export class EducationExperienceComponent implements OnChanges, OnInit {

  public degree;// 存放学历（大专、本科）
  @Input()
  resumeId;

  @Input()
  eduexp;//教育经历

  public studyExpForm: FormGroup;//学习经历表单
  public isAddStudyExp = false;// 教育经历
  public studyExp = [];//学习经历数组
  public isEdit: boolean = false; // 判断当前提交是增加，还是修改， true: 添加； false: 添加
  public currentEdu_id: number; //保存当前教育经历的 Edu_id
  public dateTime = { start_time: '', end_time: '' };
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private userInfosService: UserInfosService,
    private configInfoService: ConfigInfoService
  ) { }

  ngOnChanges() {
    this.getEducationExp();
  }

  ngOnInit() {
    if (this.userInfosService.getLocalStorageItem('degree')) {
      this.degree = this.userInfosService.getLocalStorageItem('degree');
    } else {
      this.degree = this.configInfoService.getDegreeInfo();
    }
    this.getEducationExp();

    this.studyExpForm = this.fb.group({
      school_name: [null, [Validators.required]],
      major_name: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      education_id: [null, [Validators.required]]
    });
  }

  _submitForm() {
    for (const i in this.studyExpForm.controls) {
      this.studyExpForm.controls[i].markAsDirty();
    }
    if (this.studyExpForm.value.start_time && this.studyExpForm.value.end_time) {
      let _start = this.changDatefunction(this.studyExpForm.value.start_time);
      let _end = this.changDatefunction(this.studyExpForm.value.end_time);
      this.studyExpForm.patchValue({ start_time: _start, end_time: _end });
    }

    if (this.studyExpForm.valid) {
      // 根据判断 是否为添加教育经历调用不同的接口方法
      if (!this.isEdit) {
        this.userInfosService.addResumeEduInfo(this.studyExpForm.value, this.resumeId).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      } else {
        let current_id = this.currentEdu_id;
        this.userInfosService.addResumeEduInfo(this.studyExpForm.value, this.resumeId, this.currentEdu_id).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      }
      // 关闭当前模态框表单
      this.isAddStudyExp = false;
      this.isEdit = false;
      this.currentEdu_id = null;
    }
  }

  // 时间处理方法
  changDatefunction(d) {
    let t = new Date(d);
    return t.getFullYear() + "-" + ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? '0' + t.getDate() : t.getDate());
  }

  // 获取工作经历
  getEducationExp() {
    if (this.eduexp) {
      this.studyExp = this.eduexp;
    } else {
      this.studyExp = [{
        "resume_edu_id": 1, //工作经历id
        "resume_id": 1, //简历id
        "school_name": "天投", //机构名称
        "major_name": "开发", //专业
        "start_time": "2017-12-13", //开始时间
        "end_time": "2017-12-15", //结束时间
        "education_id": 18 //学历
      }]
    }
  }

  getFormControl(name) {
    return this.studyExpForm.controls[name];
  }

  editWorksExp(resume_edu_id, i) {
    this.isAddStudyExp = true;
    this.isEdit = true;
    this.currentEdu_id = resume_edu_id;
    this.setFormDefaultValue(this.studyExp[i]);
  }
  deletWorksExp(resume_edu_id, i) {
    this.userInfosService.deleteResumeEduInfo(this.resumeId, resume_edu_id).then(res => {
      if (res['code'] === 1) {
        this.updateInfosContent();
        this.userInfosService.success({
          title: '删除成功',
          content: '教育经历删除成功'
        })
      }
    })
  }

  // 给表单设置默认值
  setFormDefaultValue(opt) {
    this.studyExpForm.setValue({
      "school_name": opt.school_name, //机构名称
      "major_name": opt.major_name, //专业
      "start_time": new Date(opt.start_time), //开始时间
      "end_time": new Date(opt.end_time), //结束时间
      "education_id": opt.education_id //学历
    })
    this.dateTime = {
      start_time: opt.start_time,
      end_time: opt.end_time
    }
  }


  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent() {
    this.userInfosService.getResumeEduInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.studyExp = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表

  handleOk = (e) => {
    this._submitForm();
  }

  handleCancel = (e) => {
    this.isAddStudyExp = false;
  }

  showModal = (e) => {
    this.isEdit = false;
    this.isAddStudyExp = true;
    this.resetForm(e);
    this.dateTime = {
      start_time: null,
      end_time: null
    }
  }
  getUpdateTime(value){
    let start = null;
    let end = null;
    if(value._startDate){
      let _start = new Date(value._startDate);
      start = this.changDatefunction(_start);
    }
    if(value._endDate){
      let _end = new Date(value._endDate);
      end = this.changDatefunction(_end);
    }
    this.studyExpForm.patchValue({
      start_time: start,
      end_time: end
    })
  }

  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.studyExpForm.reset();
    for (const key in this.studyExpForm.controls) {
      this.studyExpForm.controls[key].markAsPristine();
    }
  }
}
