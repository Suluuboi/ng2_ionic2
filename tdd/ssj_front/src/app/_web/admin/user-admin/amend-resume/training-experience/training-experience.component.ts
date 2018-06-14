import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-training-experience',
  templateUrl: './training-experience.component.html',
  styleUrls: ['./training-experience.component.css']
})
export class TrainingExperienceComponent implements OnInit, OnChanges {

  @Input()
  resumeId;
  @Input()
  trainexp;

  public pxExpForm: FormGroup;//工作经历表单
  public isAddPxExp = false;//如果添加工作经历，
  public pxExp = [];// 工作经历数组
  public isEdit: boolean = false; // 判断当前提交是增加工作经验还是修改工作经验 true: 添加； false: 添加
  public resume_train_id: number; //保存当前工作经验的 work_id
  public dateTime = { start_time: '', end_time: '' };

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService
  ) { }

  ngOnChanges() {
    this.getWorksExp();
  }

  ngOnInit() {
    this.pxExpForm = this.fb.group({
      institution_name: [null, [Validators.required]],
      course_name: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      train_content: [null, [Validators.required]]
    });
  }

  _submitForm() {
    for (const i in this.pxExpForm.controls) {
      this.pxExpForm.controls[i].markAsDirty();
    }
    // 将时间转换成 2017-12-12格式上传
    if (this.pxExpForm.value.start_time && this.pxExpForm.value.end_time) {
      let _start = this.changDatefunction(this.pxExpForm.value.start_time);
      let _end = this.changDatefunction(this.pxExpForm.value.end_time);
      // 将时间对应添加到表单对象中
      this.pxExpForm.patchValue({ start_time: _start, end_time: _end });
    }
    if (this.pxExpForm.valid) {
      // 根据判断 是否为添加工作经验调用不同的接口方法
      if (!this.isEdit) {
        this.userInfosService.addResumeTrainInfo(this.pxExpForm.value, this.resumeId).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      } else {
        let current_id = this.resume_train_id;
        this.userInfosService.addResumeTrainInfo(this.pxExpForm.value, this.resumeId, this.resume_train_id).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      }
      // 关闭当前模态框表单
      this.isAddPxExp = false;
      this.isEdit = false;
      this.resume_train_id = null;
    }
  }

  // 时间处理方法
  changDatefunction(d) {
    let t = new Date(d);
    return t.getFullYear() + "-" + ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? '0' + t.getDate() : t.getDate());
  }

  // 获取工作经历
  getWorksExp() {
    if (this.trainexp) {
      this.pxExp = this.trainexp;
    } else {
      this.pxExp = []
    }
  }

  getFormControl(name) {
    return this.pxExpForm.controls[name];
  }

  editWorksExp(resume_train_id, i) {
    this.isAddPxExp = true;
    this.isEdit = true;
    this.resume_train_id = resume_train_id;
    this.setFormDefaultValue(this.pxExp[i]);
  }
  deletWorksExp(resume_train_id, i) {
    this.userInfosService.deleteResumeTrainInfo(this.resumeId, resume_train_id).then(res => {
      if (res['code'] === 1) {
        this.updateInfosContent();
        this.userInfosService.success({
          title: '删除成功',
          content: '工作经历删除成功'
        })
      }
    })
  }

  // 给表单设置默认值
  setFormDefaultValue(opt) {
    this.pxExpForm.setValue({
      institution_name: opt.institution_name,
      course_name: opt.course_name,
      start_time: new Date(opt.start_time),
      end_time: new Date(opt.end_time),
      train_content: opt.train_content
    })
    this.dateTime = {
      start_time: opt.start_time,
      end_time: opt.end_time
    }
  }



  handleOk = (e) => {
    this._submitForm();
  }

  handleCancel = (e) => {
    this.isAddPxExp = false;
  }

  showModal = (e) => {
    this.isEdit = false;
    this.isAddPxExp = true;
    this.resetForm(e);
    this.dateTime = {
      start_time: null,
      end_time: null
    }
  }

  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.pxExpForm.reset();
    for (const key in this.pxExpForm.controls) {
      this.pxExpForm.controls[key].markAsPristine();
    }
  }

  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent() {
    this.userInfosService.getResumeTrainInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.pxExp = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  getUpdateTime(value) {
    let start = null;
    let end = null;
    if (value._startDate) {
      let _start = new Date(value._startDate);
      start = this.changDatefunction(_start);
    }
    if (value._endDate) {
      let _end = new Date(value._endDate);
      end = this.changDatefunction(_end);
    }
    this.pxExpForm.patchValue({
      start_time: start,
      end_time: end
    })
  }

}
