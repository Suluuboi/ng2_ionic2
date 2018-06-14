import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginGuard } from './guard/user-login.guard';
import { UserInfoLeaveGuard } from './guard/user-info-leave.guard';
import { UserPermissionGuard } from './guard/user-permission.guard';
// 组件
import { UserAdminComponent } from './user-admin.component';
import { UserHomePageComponent } from './home-page/home-page.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateResumeComponent } from './create-resume/create-resume.component';
import { UserResumesComponent } from './user-resumes/user-resumes.component';
import { UserPwdManagerComponent } from './user-pwd-manager/user-pwd-manager.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ResumesViewedComponent } from './resumes-viewed/resumes-viewed.component';
import { JobsCollectComponent } from './jobs-collect/jobs-collect.component';
import { AmendResumeComponent } from './amend-resume/amend-resume.component';
const routes: Routes = [
  {
    path: "", component: UserAdminComponent, data: { title: '个人用户中心' },
    canActivate: [UserLoginGuard],
    children: [
      // 个人中心管理
      { path: '', redirectTo: 'userHome', pathMatch: 'full' },//管理首页 
      { path: 'userHome', component: UserHomePageComponent, data: { title: '个人用户中心-首页' } },//管理首页
      { path: 'userInfo', component: UserInfoComponent, canDeactivate: [UserInfoLeaveGuard], data: { title: '个人资料更新' } },//个人资料
      { path: 'userPwd', component: UserPwdManagerComponent, data: { title: '密码修改-账号管理' } },//个人用户密码管理
      { path: 'userResume', component: UserResumesComponent, canActivate: [UserPermissionGuard], data: { title: '简历信息-简历管理' } }, //个人用户的简历列表
      { path: 'resume', component: CreateResumeComponent, canActivate: [UserPermissionGuard], data: { title: '简历创建-简历管理' },},//创建简历
      { path: 'resume/edit/:id', component: AmendResumeComponent, canActivate: [UserPermissionGuard], data: { title: '简历修改-简历管理' } },// 完善简历 AmendResumeComponent
      { path: 'appliedJobs', component: AppliedJobsComponent, canActivate: [UserPermissionGuard], data: { title: '已投递职位中心-申请的职位' } },//已申请的职位
      { path: 'collect', component: JobsCollectComponent, canActivate: [UserPermissionGuard], data: { title: '收藏的职位' } },// 已收藏的职位
      { path: 'viewed', component: ResumesViewedComponent, canActivate: [UserPermissionGuard], data: { title: '被查看的简历-简历管理' } },// 被查看的简历
      { path: "**", redirectTo: 'error', pathMatch: 'full' }
    ]
  },
  { path: "**", redirectTo: 'error', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserAdminRoutingModule { }