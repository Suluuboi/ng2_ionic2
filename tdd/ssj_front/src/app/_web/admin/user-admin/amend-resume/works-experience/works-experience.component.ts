import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserInfosService } from '../../user-admin-service/user-admin.service';


@Component({
  selector: 'app-works-experience',
  templateUrl: './works-experience.component.html',
  styleUrls: ['./works-experience.component.css']
})
export class WorksExperienceComponent implements OnChanges, OnInit {

  public workExpForm: FormGroup;//工作经历表单
  public isAddWorksExp = false;//如果添加工作经历，
  public workExp = [];// 工作经历数组
  public isEdit: boolean = false; // 判断当前提交是增加工作经验还是修改工作经验 true: 添加； false: 添加
  public currentWork_id: number; //保存当前工作经验的 work_id

  public dateTime = { start_time: '', end_time: '' };
  @Input()
  resumeId;
  @Input()
  workexp;

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService
  ) { }

  ngOnChanges() {
    this.getWorksExp();
  }

  ngOnInit() {
    this.workExpForm = this.fb.group({
      company_name: [null, Validators.required],
      position_name: [null, Validators.required],
      start_time: [null, Validators.required],
      end_time: [null, Validators.required],
      job_content: [null, Validators.required]
    })
  }

  _submitForm() {
    for (const i in this.workExpForm.controls) {
      this.workExpForm.controls[i].markAsDirty();
    }
    // 将时间转换成 2017-12-12格式上传
    if (this.workExpForm.value.start_time && this.workExpForm.value.end_time) {
      let _start = this.changDatefunction(this.workExpForm.value.start_time);
      let _end = this.changDatefunction(this.workExpForm.value.end_time);
      // 将时间对应添加到表单对象中
      this.workExpForm.patchValue({ start_time: _start, end_time: _end });
    }

    if (this.workExpForm.valid) {
      // 根据判断 是否为添加工作经验调用不同的接口方法
      if (!this.isEdit) {// 添加信息
        this.userInfosService.addResumeWorksInfo(this.workExpForm.value, this.resumeId).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      } else {// 添加信息
        let current_id = this.currentWork_id;
        this.userInfosService.addResumeWorksInfo(this.workExpForm.value, this.resumeId, this.currentWork_id).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      }
      // 关闭当前模态框表单
      this.isAddWorksExp = false;
      this.isEdit = false;
      this.currentWork_id = null;
    }
  }

  // 时间处理方法
  changDatefunction(d) {
    let t = new Date(d);
    return t.getFullYear() + "-" + ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? '0' + t.getDate() : t.getDate());
  }

  // 获取工作经历
  getWorksExp() {
    if (this.workexp) {
      this.workExp = this.workexp;
    } else {
      this.workExp = []
    }
  }

  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent() {
    this.userInfosService.getResumeWorksInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.workExp = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表

  getFormControl(name) {
    return this.workExpForm.controls[name];
  }

  editWorksExp(resume_work_id, i) {
    this.isAddWorksExp = true;
    this.isEdit = true;
    this.currentWork_id = resume_work_id;
    this.setFormDefaultValue(this.workExp[i]);
  }
  deletWorksExp(resume_work_id, i) {
    this.userInfosService.deleteResumeWorksInfo(this.resumeId, resume_work_id).then(res => {
      if (res['code'] === 1) {
        this.updateInfosContent();
        this.userInfosService.success({
          title: '删除成功',
          content: '工作经历删除成功'
        });
      }
    })
  }

  // 给表单设置默认值
  setFormDefaultValue(opt) {
    this.workExpForm.setValue({
      company_name: opt.company_name,
      position_name: opt.position_name,
      start_time: new Date(opt.start_time),
      end_time: new Date(opt.end_time),
      job_content: opt.job_content
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
    this.isAddWorksExp = false;
  }

  showModal = (e) => {
    this.isEdit = false;
    this.isAddWorksExp = true;
    this.resetForm(e);
    this.dateTime = {
      start_time: null,
      end_time: null
    }
  }

  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.workExpForm.reset();
    for (const key in this.workExpForm.controls) {
      this.workExpForm.controls[key].markAsPristine();
    }
  }

  getUpdateTime(value) {
    let start = null;
    let end = null;
    if (value._startDate) {
      let _start = new Date(value._startDate);
      start = this.dealDateWith(_start);
    }
    if (value._endDate) {
      let _end = new Date(value._endDate);
      end = this.dealDateWith(_end);
    }
    this.workExpForm.patchValue({
      start_time: start,
      end_time: end
    })
  }
  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }
}
