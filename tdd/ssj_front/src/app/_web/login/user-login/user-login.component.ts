import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../_core/service/_user-service/login.service';
import { CheckMsgnumberService } from '../../../_core/service/_user-service/check-msgnumber.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public userLoginForm: FormGroup;
  public _loginCheckMsgForm: FormGroup;
  public _time = 60; //验证码发送倒计时
  public isLoading:Boolean = false;
  public errorText = '';

  tabs = [
    {active: true, name  : '用户名登录'},
    {active: false, name  : '验证码登录'}
  ];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private checkMsgService: CheckMsgnumberService
  ) { }
  // 添加验证
  public checkOption = {
    userName : false,
    password : false,
  }
  ngOnInit() {
    this.userLoginForm = this.fb.group({
      formLayout: ['horizontal'],
      userName: [null, [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this._loginCheckMsgForm = this.fb.group({
      formLayout: ['horizontal'],
      phoneNumber: [null, [Validators.required]],
      // phoneNumber: [null, [Validators.required, Validators.pattern('^0?(13|14|15|18)[0-9]{9}$')]],
      checkMsg: [null, [Validators.required]]
    });

    this.userLoginForm.get('userName').valueChanges.subscribe(res=>{
      this.checkUserNameFunction(res);
    })
    this.userLoginForm.get('password').valueChanges.subscribe(res=>{
      this.checkPasswordFunction(res);
    })
  }
  // check msg function
  checkUserNameFunction = (value:string) => {
    let reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
    if(!(reg.test(value))){
      this.checkOption.userName = true;
    }else{
      this.checkOption.userName = false;
    }
  }
  checkPasswordFunction = (value:string) => {
    if(value.length < 6){
      this.checkOption.password = true;
    }else{
      this.checkOption.password = false;
    }
  }
  // 密码登录
  _loginForm() {
    for (const i in this.userLoginForm.controls) {
      this.userLoginForm.controls[i].markAsDirty();
    }
    this.checkUserNameFunction(this.userLoginForm.value.userName);// checked userName
    this.checkPasswordFunction(this.userLoginForm.value.password);// checked password
    
    if(this.userLoginForm.valid){
      this.errorText = '';
      this.loginService.loginIn(this.userLoginForm.value).then(res => {
          if(res['code'] == 1 ){ 
              let _type = res['data']['type'];
              if(_type == 'person'){
                this.loginService.navTo('/userAdmin');
              }else{
                this.loginService.navTo('/companyAdmin');
              }
          }else{
            this.checkMsgService.success('error', res['msg']);
          }
        });
    }else{
      return false;
    }
  }
//  验证码登录
  loginCheckMsgSubmit() {
    for (const i in this._loginCheckMsgForm.controls) {
      this._loginCheckMsgForm.controls[i].markAsDirty();
    }
    if(this._loginCheckMsgForm.valid){
      this.loginService.checkNumberLoginIn({
        phone: this._loginCheckMsgForm.value.phoneNumber,
        code: this._loginCheckMsgForm.value.checkMsg
      }).then(res=>{
        if(res['code'] === 1){
          this.checkMsgService.success('success', '登录成功');
          if(res['data'].type === 'person'){
            this.loginService.navTo('/userAdmin');
          }else{
            this.loginService.navTo('/companyAdmin');
          }
        }else{
          this.errorText = '';
          for(let i in res['data']){
            this.errorText += res['data'][i]+";";
          }
          this.checkMsgService.success('error', this.errorText);
        }
      })
    }
  }

  getCheckMsg = (value) => {
    let phoneReg = /^0?(13|14|15|18)[0-9]{9}$/;
    // 验证手机号码格式是否填写正确。 如果正确则发送验证码。 不正确则返回
    if(this._loginCheckMsgForm.value.phoneNumber){
      if(phoneReg.test(this._loginCheckMsgForm.value.phoneNumber)){
        this.checkMsgService.getCheckMsgNumber(this._loginCheckMsgForm.value.phoneNumber).then(res=>{
          if(res['code'] === 1){
            this.checkMsgService.success('success', '验证码发送成功！');
            this.isLoading = true;
            setInterval(() => {
              this._time--;
              if (this._time == 0) {
                this.isLoading = false;
                this._time = 60;
              }
            }, 1000);
          }else{
            this.checkMsgService.error({
              title: '发送失败',
              content: res['data']
            })
          }
        })
      }else{
        this.checkMsgService.success('error', '手机号码格式不正确');
      }
    }
  };
}
