import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { NzModalSubject } from 'ng-zorro-antd';
import { LoginService } from '../../../_core/service/_user-service/login.service';

@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.css']
})
export class IndexLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMsg :String = '';
  public _type:string = '';
  @Input()
  set type(value){
    this._type = value;
  }

  public checkOption = {
    userName : false,
    password : false,
  }
  constructor(
    private fb: FormBuilder,
    private subject: NzModalSubject,
    private loginService : LoginService
  ) {
    this.subject.on('onDestory', () => {
     //console.log('destroy');
    });
  }
 
  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [ true ]
    });

    this.loginForm.get('userName').valueChanges.subscribe(res=>{
      this.checkUserNameFunction(res);
    })
    this.loginForm.get('password').valueChanges.subscribe(res=>{
      this.checkPasswordFunction(res);
    })
  }
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
          this.loginService.showMessage('success', '登录成功');
          this.handleCancel();
          if(res['data'].type === 'company'){
            this.loginService.error({
              title: '操作错误',
              content: '用户类型不正确，禁止此项操作！',
              ok: () =>{
                window.location.reload();
              }
            })
          }else{
            this.emitDataOutside(this._type);
          }
        }else{
          this.errorMsg = res['msg'];
          this.loginService.showMessage('error', this.errorMsg);
        }
      });
    }else{ return false;}
  }

  emitDataOutside(val) {
    this.subject.next(val);
  }
  handleCancel() {
    this.subject.destroy('onCancel');
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

  navToRegister(){
    this.handleCancel();
    this.loginService.navTo('/register');
  }

  retrievePassword(){
    this.handleCancel();
  }

}
