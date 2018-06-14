import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.css']
})
export class SelfEvaluationComponent implements OnInit, OnChanges {
  @Input()
  resumeId;
  @Input()
  selfmsg;

  public selfExpForm: FormGroup;//自我评价表单
  public isAddSelfExp = false;//如果添加自我评价
  // public selfExp = ''; //自我评价内容

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService
  ) { }

  ngOnChanges() {
    
  }
  ngOnInit() {
    // 自我评价
    this.selfExpForm = this.fb.group({
      self_evaluation: [this.selfmsg, [Validators.required]]
    });
  }

  getFormControl(name) {
    return this.selfExpForm.controls[name];
  }
  _submitForm() {
    for (const i in this.selfExpForm.controls) {
      this.selfExpForm.controls[i].markAsDirty();
    }
    this.userInfosService.addResumeSelfInfo(this.selfExpForm.value, this.resumeId).then(res => {
      if (res['code'] === 1) {
        this.selfmsg = this.selfExpForm.value.self_evaluation;
      }
    })
  }

  // 给表单设置默认值
  setFormDefaultValue(opt) {
    this.selfExpForm.setValue({
      self_evaluation: opt.self_evaluation
    })
  }

  handleOk = (e) => {
    this._submitForm();
    if (this.selfExpForm.status === 'INVALID') {
      return false;
    }
    // 关闭当前模态框表单
    this.isAddSelfExp = false;
  }

  handleCancel = (e) => {
    this.isAddSelfExp = false;
  }

  showModal = (e) => {
    this.isAddSelfExp = true;
    this.setFormDefaultValue({
      self_evaluation : this.selfmsg
    })
  }
}
