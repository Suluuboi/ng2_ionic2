import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';

@Injectable()
export class UserInfoLeaveGuard implements CanDeactivate<UserInfoComponent> {
  canDeactivate(
    userInfoComponent: UserInfoComponent
  ){
    if(userInfoComponent.isUpDate){
      return true;
    }else{
      return window.confirm('信息未保存，您确定要离开吗？');
    }
  }
}