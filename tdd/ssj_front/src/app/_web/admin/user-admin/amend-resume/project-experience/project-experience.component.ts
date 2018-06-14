import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-project-experience',
  templateUrl: './project-experience.component.html',
  styleUrls: ['./project-experience.component.css']
})
export class ProjectExperienceComponent implements OnInit, OnChanges {
  @Input()
  resumeId;

  @Input()
  projectexp;



  public proExpForm: FormGroup;//项目经历表单
  public isAddProExp = false;//如果添加项目经历，
  public proExp = [];// 项目经历数组
  public isEdit: boolean = false; // 判断当前提交是增加项目经验还是修改项目经验 true: 添加； false: 添加
  public currentProject_id: number; //保存当前项目经验的 work_id
  public dateTime = { start_time: '', end_time: '' };

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService
  ) { }

  ngOnChanges() {
    this.getWorksExp();
  }

  ngOnInit() {
    // 项目经验
    this.proExpForm = this.fb.group({
      project_name: [null, [Validators.required]],
      position_name: [null, [Validators.required]],
      start_time: [null, [Validators.required]],
      end_time: [null, [Validators.required]],
      project_content: [null, [Validators.required]]
    });

  }

  _submitForm() {
    for (const i in this.proExpForm.controls) {
      this.proExpForm.controls[i].markAsDirty();
    }
    // 将时间转换成 2017-12-12格式上传
    if (this.proExpForm.value.start_time && this.proExpForm.value.end_time) {
      let _start = this.changDatefunction(this.proExpForm.value.start_time);
      let _end = this.changDatefunction(this.proExpForm.value.end_time);
      // 将时间对应添加到表单对象中
      this.proExpForm.patchValue({ start_time: _start, end_time: _end });
    }
    if (this.proExpForm.valid) {
      // 根据判断 是否为添加项目经验调用不同的接口方法
      if (!this.isEdit) {
        this.userInfosService.addResumeProjectInfo(this.proExpForm.value, this.resumeId).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      } else {
        let current_id = this.currentProject_id;
        this.userInfosService.addResumeProjectInfo(this.proExpForm.value, this.resumeId, this.currentProject_id).then(res => {
          if (res['code'] === 1) {
            this.updateInfosContent();
          }
        })
      }
      // 关闭当前模态框表单
      this.isAddProExp = false;
      this.isEdit = false;
      this.currentProject_id = null;
    }
  }


  getFormControl(name) {
    return this.proExpForm.controls[name];
  }

  // 时间处理方法
  changDatefunction(d) {
    let t = new Date(d);
    return t.getFullYear() + "-" + ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? '0' + t.getDate() : t.getDate());
  }

  // 获取项目经历
  getWorksExp() {
    this.userInfosService.getResumeProjectInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.proExp = res['data'];
      } else {
        this.proExp = []
      }
    })
  }

  editWorksExp(resume_project_id, i) {
    this.isAddProExp = true;
    this.isEdit = true;
    this.currentProject_id = resume_project_id;
    this.setFormDefaultValue(this.proExp[i]);
  }
  deletWorksExp(resume_project_id, i) {
    this.userInfosService.deleteResumeProjectInfo(this.resumeId, resume_project_id).then(res => {
      if (res['code'] === 1) {
        this.updateInfosContent();
        this.userInfosService.success({
          title: '删除成功',
          content: '项目经历删除成功'
        })
      }
    })
  }

  // 给表单设置默认值
  setFormDefaultValue(opt) {
    this.proExpForm.setValue({
      project_name: opt.project_name,
      position_name: opt.position_name,
      start_time: new Date(opt.start_time),
      end_time: new Date(opt.end_time),
      project_content: opt.project_content
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
    this.isAddProExp = false;
  }

  showModal = (e) => {
    this.isEdit = false;
    this.isAddProExp = true;
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
    this.proExpForm.patchValue({
      start_time: start,
      end_time: end
    })
  }

  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.proExpForm.reset();
    for (const key in this.proExpForm.controls) {
      this.proExpForm.controls[key].markAsPristine();
    }
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent() {
    this.userInfosService.getResumeProjectInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.proExp = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
}
