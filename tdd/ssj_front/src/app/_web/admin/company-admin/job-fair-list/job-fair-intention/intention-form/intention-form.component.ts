import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalSubject } from 'ng-zorro-antd';
import { CompanyInfosService } from '../../../company-admin-service/company-infos.service';

class IntentionInfo {
  name                : string;
  id_card             : string;
  phone               : string;
  desire_company      : string;
  desire_job          : string;
  desire_company_phone: string;
}

@Component({
  selector: 'app-intention-form',
  templateUrl: './intention-form.component.html',
  styleUrls: ['./intention-form.component.css']
})

export class IntentionFormComponent implements OnInit {
  public btnText = '添加';
  public isEidt:boolean = false; //判断为修改还是添加
  intentionForm: FormGroup;
  public _info:IntentionInfo;
  public options:object = {};
  public fair_id;
  @Input()
  set info(value){
    if(value !== ''){
      this._info = value;
    }
  }
  @Input()
  set id(value:string){
    this.fair_id = value;
  }
  constructor(
    private fb: FormBuilder,
    private companyInfoService: CompanyInfosService,
    private subject: NzModalSubject
  ) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
    this.intentionForm = this.fb.group({
      name            : [ null, [ Validators.required ] ],
      id_card         : [ null, [ Validators.required ] ],
      phone           : [ null, [ Validators.required] ],
      desire_company  : [ null, [ Validators.required ] ],
      desire_job      : [ null, [ Validators.required ] ],
      desire_company_phone: [ null, [ Validators.required ] ]
    });
    if(this._info && this._info['name'] != ''){
      this.btnText = '修改';
      this.isEidt = true;
      this.options['agreement_id'] = this._info['id'];
      this.setFormDefaultValue();
    }
  }

  _submitForm() {
    for (const i in this.intentionForm.controls) {
      this.intentionForm.controls[ i ].markAsDirty();
    }
    if(this.intentionForm.valid){
      this.options = Object.assign(this.options, this.intentionForm.value);
      if(this.isEidt){
        this.companyInfoService.editIntentionAgreeMents(this.options).then(res=>{
          if(res['code'] === 1){
            this.companyInfoService.showMessage('success', res['msg']);
            this.handleCancel();
            this.emitDataOutside();
          }else{
            this.companyInfoService.showMessage('error', res['msg']);
            this.handleCancel();
          }
        })
      }else{
        this.options['fair_id'] = this.fair_id;
        this.companyInfoService.addIntentionAgreeMents(this.options).then(res=>{
          if(res['code'] === 1){
            this.companyInfoService.showMessage('success', res['msg']);
            this.handleCancel();
            this.emitDataOutside();
          }else{
            this.companyInfoService.showMessage('error', res['msg']);
            this.handleCancel();
          }
        })
      }
    }
  }

  setFormDefaultValue = () =>{
    this.intentionForm.setValue({
      name                : this._info.name,
      id_card             : this._info.id_card,
      phone               : this._info.phone,
      desire_company      : this._info.desire_company,
      desire_job          : this._info.desire_job,
      desire_company_phone: this._info.desire_company_phone
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
