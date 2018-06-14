import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router }   from '@angular/router';

@Injectable()
export class ChangePwdService {

  constructor(
    private route: Router,
    private http: HttpClient,
  ) { }
  // 找回密码
  findPassword(opt){
    return this.http.post('/api/forget_password', opt).toPromise().then(res=>{
      return res;
    })
  }

  // 修改密码
  changePassword(opt){
    let option = new Object();
    option['old_password'] = opt.password;
    option['new_password'] = opt.newPassword;
    option['new_password_confirmation'] = opt.checkNewPassword;

    return this.http.post('/api/reset_password', option).toPromise()
               .then(res => {
                    return res;
                });
  }
  // 找回密码（忘记密码时使用）

  // 重新登录，路由跳转
  navgateTo(url){
    this.route.navigateByUrl(url);
  }
}
