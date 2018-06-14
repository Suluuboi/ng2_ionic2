import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalSubject } from 'ng-zorro-antd';
import { CompanyInfosService } from '../../../company-admin-service/company-infos.service';

class IntentionInfo {
  is_work       :string;
  work_company  :string;
  job_name      :string;
  note          :string;
}
@Component({
  selector: 'app-return-visit-form',
  templateUrl: './return-visit-form.component.html',
  styleUrls: ['./return-visit-form.component.css']
})
export class ReturnVisitFormComponent implements OnInit {
  intentionForm: FormGroup;
  public _info:IntentionInfo;
  public options:object = {};
  @Input()
  set info(value){
    if(value !== ''){
      this._info = value;
    }
  }
  @Input()
  set id(value:string){
    this.options['agreement_id'] = value;
  }
  constructor(
    private fb: FormBuilder,
    private subject: NzModalSubject,
    private companyInfoService: CompanyInfosService
  ) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
    this.intentionForm = this.fb.group({
      is_work       : [ null, [Validators.required]],
      work_company  : [ null, [Validators.required]],
      job_name      : [ null, [Validators.required]],
      note          : [ null]
    });
    if(this._info && this._info['name'] != ''){
      this.setFormDefaultValue();
    }
  }

  _submitForm() {
    for (const i in this.intentionForm.controls) {
      this.intentionForm.controls[ i ].markAsDirty();
    }
    if(this.intentionForm.valid){
      this.options = Object.assign(this.options, this.intentionForm.value);
      this.options['fair_id'];
      this.addIntentionVisit(this.options);
    }
  }

  addIntentionVisit(opt){
    this.companyInfoService.addIntentionvisitReturn(opt).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this.emitDataOutside();
        this.handleCancel();
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  // 设置默认值
  setFormDefaultValue = () =>{
    this.intentionForm.setValue({
      is_work       : "" + this._info.is_work,
      work_company  : this._info.work_company,
      job_name      : this._info.job_name,
      note          : this._info.note
    });
  }

  getFormControl(name) {
    return this.intentionForm.controls[ name ];
  }

  // 向上传递数据
  emitDataOutside() {
    this.subject.next({isEdit: true});
  }
  // 关闭当前弹出框
  handleCancel() {
    this.subject.destroy('onCancel');
  }
}
