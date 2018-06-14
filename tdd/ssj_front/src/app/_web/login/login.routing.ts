import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
    {path: '', component: UserLoginComponent, data: {title: '用户登录'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }