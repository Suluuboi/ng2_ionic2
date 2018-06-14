import { ApiData } from './../../../../menu_config/data';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  public isPerfect:boolean = false;
  constructor(
    private userInfosService: UserInfosService
  ){}
  canActivate() {
    // 这里判断资料是否完善, 返回 true 或 false
    return this.userInfosService.checkUserInfoIsPermission().then((res:ApiData)=>{
      if(res.code === 1001){
        this.isPerfect = false;
        this.userInfosService.showMessage('warning', res.msg);
        this.userInfosService.navTo('/userAdmin/userInfo');
      }
      this.isPerfect = true;
      return this.isPerfect;
    })
  }
}