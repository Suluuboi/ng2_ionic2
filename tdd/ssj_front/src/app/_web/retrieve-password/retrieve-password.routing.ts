import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetrievePasswordComponent } from './retrieve-password.component';

const routes: Routes = [
    {path: '', component: RetrievePasswordComponent, data: {title: '找回密码-密码重置'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetrievePwdRoutingModule { }