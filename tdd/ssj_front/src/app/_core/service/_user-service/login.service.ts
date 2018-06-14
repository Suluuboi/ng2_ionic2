import { HttpClient } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
@Injectable()
export class LoginService {
 
  constructor(
    private confirmServ: NzModalService,
    private _message: NzMessageService,
    private http: HttpClient,
    private route: Router
  ) { }

  // 获取用户数据信息
  getUserInfos(){
    return this.http.post('/api/user', {}).toPromise().then(res=>{
      return res;
    })
  }
  // 手机验证码登录
  checkNumberLoginIn(opt){
    return this.http.post('/api/login_code', opt).toPromise().then(res=>{
      return res;
    })
  }
  // 登录
  loginIn(opt){
    let option = new Object();
    option['phone'] = opt.userName;
    option['password'] = opt.password;
    return  this.http.post('/api/login', option).toPromise().then( res => {
              return res;
            })
  }

  navTo(url){
    this.route.navigateByUrl(url);
  }

  loginOut(){
    return this.http.post('/api/logout', {}).toPromise()
             .then( res =>{
               window.location.reload();
              return res;
            });
  }
  error(opt) {
      this.confirmServ.error({
          title: opt.title,
          content: opt.content,
          onOk: opt.ok
      });
  }
  showMessage = (type, text) => {
    this._message.create(type, text);
  };
}
