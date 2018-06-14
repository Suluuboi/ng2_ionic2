import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-skills-experience',
  templateUrl: './skills-experience.component.html',
  styleUrls: ['./skills-experience.component.css']
})
export class SkillsExperienceComponent implements OnInit, OnChanges {
  @Input()
  resumeId;
  @Input()
  skillexp;

  public skillForm: FormGroup;//学习经历表单
  public isAddSkill = false;// 教育经历
  public skills = [];//学习经历数组
  public isEdit: boolean = false; // 判断当前提交是增加，还是修改， true: 添加； false: 添加
  public currentSkill_id: number; //保存当前教育经历的 Edu_id


  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService
  ) { }


  ngOnChanges() {
    this.getEducationExp();
  }

  ngOnInit() {
    // 职业技能
    this.skillForm = this.fb.group({
      skill_name: [null, [Validators.required]],
      skill_level: [null, [Validators.required]]
    });
  }
  _submitForm() {
    for (const i in this.skillForm.controls) {
      this.skillForm.controls[i].markAsDirty();
    }

    // 根据判断 是否为添加教育经历调用不同的接口方法
    if (!this.isEdit) {
      this.userInfosService.addResumeSkillInfo(this.skillForm.value, this.resumeId).then(res => {
        if (res['code'] === 1) {
          this.updateInfosContent();
        }
      })
    } else {
      let current_id = this.currentSkill_id;
      this.userInfosService.addResumeSkillInfo(this.skillForm.value, this.resumeId, this.currentSkill_id).then(res => {
        if (res['code'] === 1) {
          this.updateInfosContent();
        }
      })
    }
  }
  // 获取工作经历
  getEducationExp() {
    if (this.skillexp) {
      this.skills = this.skillexp;
    } else {
      this.skills = []
    }
  }

  getFormControl(name) {
    return this.skillForm.controls[name];
  }

  editWorksExp(resume_skill_id, i) {
    this.isAddSkill = true;
    this.isEdit = true;
    this.currentSkill_id = resume_skill_id;
    this.setFormDefaultValue(this.skills[i]);
  }
  deletWorksExp(resume_skill_id, i) {
    this.userInfosService.deleteResumeSkillInfo(this.resumeId, resume_skill_id).then(res => {
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
    this.skillForm.setValue({
      "skill_name": opt.skill_name, //机构名称
      "skill_level": opt.skill_level //学历
    })
  }



  handleOk = (e) => {
    if (this.skillForm.status === 'INVALID') {
      return false;
    }
    this._submitForm();
    // 关闭当前模态框表单
    this.isAddSkill = false;
    this.isEdit = false;
    this.currentSkill_id = null;
  }

  handleCancel = (e) => {
    this.isAddSkill = false;
  }

  showModal = (e) => {
    this.isEdit = false;
    this.isAddSkill = true;
    this.resetForm(e);
  }

  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.skillForm.reset();
    for (const key in this.skillForm.controls) {
      this.skillForm.controls[key].markAsPristine();
    }
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent() {
    this.userInfosService.getResumeSkillInfo(this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.skills = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
}
