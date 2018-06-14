import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../../../../_core/service/_user-service/login.service';


@Injectable()
export class CompanyLoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService
  ){}
  canActivate(){
    return this.loginService.getUserInfos().then(res=>{
      if(res['code'] === 1){
        if(res['data'].type === 'company'){
          return true;
        }else if(res['data'].type === 'person'){
          this.loginService.navTo('userAdmin');
        }
        return false;
      }else if(res['code'] === 401){
        this.loginService.error({
          title: '操作失败',
          content: '账号未登录',
          ok: ()=>{
            this.loginService.navTo('/login');
          }
        })
        return false;
      }
      return false;
    })
  }
}
