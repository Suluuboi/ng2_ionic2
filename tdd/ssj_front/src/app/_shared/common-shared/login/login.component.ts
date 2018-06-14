import { NzModalSubject } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { LoginService } from '../../../_core/service/_user-service/login.service';
import { CheckMsgnumberService } from '../../../_core/service/_user-service/check-msgnumber.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;// 用户密码登录
    public checkMsgForm: FormGroup;// 验证码登录表单
    public _time = 60; //验证码发送倒计时
    public isLoading:Boolean = false;
    public errorText :String = '';
   // 添加验证
   public checkOption = {
    userName : false,
    password : false,
  }
    constructor(
      private fb: FormBuilder,
      private subject: NzModalSubject,
      private loginService : LoginService,
      private checkMsgService: CheckMsgnumberService
    ) {
      this.subject.on('onDestory', () => {
      });
    }
   
    ngOnInit() {
      this.loginForm = this.fb.group({
        userName: [null, [Validators.required, Validators.minLength(11)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.checkMsgForm = this.fb.group({
        phone: [ null, [ Validators.required, Validators.pattern('^0?(13|14|15|18)[0-9]{9}$') ] ],
        code: [ null, [ Validators.required ] ]
      });

      this.loginForm.get('userName').valueChanges.subscribe(res=>{
        this.checkUserNameFunction(res);
      })
      this.loginForm.get('password').valueChanges.subscribe(res=>{
        this.checkPasswordFunction(res);
      })
    }
    // 用户密码登录 表单提交
    _submitForm() {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[ i ].markAsDirty();
      }
      this.checkUserNameFunction(this.loginForm.value.userName);// checked userName
      this.checkPasswordFunction(this.loginForm.value.password);// checked password
      if(this.loginForm.valid){
        let option = this.loginForm.value;
        this.loginService.loginIn(option).then(res => {
          if(res['code'] == 1){
            this.checkMsgService.success('success', '登录成功!');
            this.handleCancel();
            let _type = res['data']['type'];
            this.handleOk(_type);
          }else{
            this.checkMsgService.success('error', res['msg']);
            return false;
          }
        });
      }else{ return false;}
    }
    // 手机验证码登录表单提交
    submitcheckMsgForm() {
      for (const i in this.checkMsgForm.controls) {
        this.checkMsgForm.controls[ i ].markAsDirty();
      }
      if(this.checkMsgForm.valid){
        let option = this.checkMsgForm.value;
        this.loginService.checkNumberLoginIn(option).then(res => {
          if(res['code'] == 1){
            this.checkMsgService.success('success', '登录成功!');
            this.handleCancel();
            let _type = res['data']['type'];
            this.handleOk(_type);
          }else{
            this.checkMsgService.success('error', res['msg']);
            return false;
          }
        });
      }else{ return false;}
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
  // 获取验证码
    getCheckMsg = (value) => {
      let phoneReg = /^0?(13|14|15|18)[0-9]{9}$/;
      // 验证手机号码格式是否填写正确。 如果正确则发送验证码。 不正确则返回
      if(this.checkMsgForm.value.phone){
        if(phoneReg.test(this.checkMsgForm.value.phone)){
          this.checkMsgService.getCheckMsgNumber(this.checkMsgForm.value.phone).then(res=>{
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
              this.checkMsgService.success('error', res['data']);
            }
          })
        }
      }else{
        this.checkMsgService.success('error', '手机号码不能为空');
      }
    };
    // 登录成功处理
    handleOk = (_type) =>{
      if(_type == 'person'){
        this.loginService.navTo('/userAdmin');
      }else{
        this.loginService.navTo('/companyAdmin');
      }
    }

    // 隐藏弹窗并导航到注册页面
    navToRegister(){
      this.handleCancel();
      this.loginService.navTo('/register');
    }

    retrievePassword(){
      this.handleCancel();
    }
    handleCancel() {
      this.subject.destroy('onCancel');
    }
}
