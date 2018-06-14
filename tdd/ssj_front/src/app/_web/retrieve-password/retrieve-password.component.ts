import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChangePwdService } from '../../_core/service/_user-service/change-pwd.service';
import { CheckMsgnumberService } from '../../_core/service/_user-service/check-msgnumber.service';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.css']
})
export class RetrievePasswordComponent implements OnInit {

  public changePwdForm: FormGroup;
  public isSendCheckNumber: Boolean = false;
  public isSending: Boolean = false;
  public errorText: string = '';

  constructor(
    private fb: FormBuilder,
    private changePwdService: ChangePwdService,
    private checkMsgService: CheckMsgnumberService
  ) { }

  ngOnInit() {
    this.changePwdForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern('^0?(13|14|15|18)[0-9]{9}$')]],
      code: [null, [Validators.required]],
      new_password: [null, [Validators.required, Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$')]],
      new_password_confirmation: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  get isHorizontal() {
    return this.changePwdForm.controls['formLayout'] && this.changePwdForm.controls['formLayout'].value === 'horizontal';
  }

  getFormControl(name) {
    return this.changePwdForm.controls[name];
  }

  _submitForm() {
    for (const i in this.changePwdForm.controls) {
      this.changePwdForm.controls[i].markAsDirty();
    }
    // 登录成功后跳转到个人中心(判断注册的是个人用户还是单位用户),调用注册服务判断
    // 判断注册表单是否正确通过验证。
    if (this.changePwdForm.status == "VALID") {
      let option = this.changePwdForm.value;
      this.changePwdService.findPassword(option).then(res=>{
        if(res['code'] === 1){
          this.checkMsgService.success('success', '修改成功');
          setTimeout( ()=>{
            this.changePwdService.navgateTo('/login');
          }, 400);
        }else{
          this.errorText = '';
          for(let i in res['data']){
            this.errorText += res['data'][i] + '<br>';
          }
          this.checkMsgService.error({
            title: '操作失败',
            content: this.errorText
          })
        }
      })
    } else { return false; }
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.changePwdForm.controls['new_password_confirmation'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePwdForm.controls['new_password'].value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  public _index = 60;
  // 验证码发送
  sendCheckNumber = (value) => {
    let phoneReg = /^0?(13|14|15|18)[0-9]{9}$/;
    // 验证手机号码格式是否填写正确。 如果正确则发送验证码。 不正确则返回
    if (this.changePwdForm.value.phone) {
      if (phoneReg.test(this.changePwdForm.value.phone)) {
        this.checkMsgService.getCheckMsgNumber(this.changePwdForm.value.phone).then(res => {
          if (res['code'] === 1) {
            this.checkMsgService.success('success', '验证码发送成功！');
            this.isSending = true;
            setInterval(() => {
              this._index--;
              if (this._index == 0) {
                this.isSending = false;
                this._index = 60;
              }
            }, 1000);
          } else {
            this.checkMsgService.error({
              title: '发送失败',
              content: res['data']
            })
          }
        })
      }
    } else {
      this.checkMsgService.error({
        title: '发送失败',
        content: '手机号码不能为空！'
      })
    }
  };
}

