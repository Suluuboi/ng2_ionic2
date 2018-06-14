import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'index', loadChildren: './_web/index/web-index.module#IndexModule'},
  { path: 'zhaopin', loadChildren: './_web/zhaopin/web-zhaopin.module#WebZhaopinModule'},
  { path: 'training', loadChildren: './_web/training/training.module#TrainingModule'},
  { path: 'gestation', loadChildren: './_web/gestation/gestation.module#GestationModule'},
  { path: 'video', loadChildren: './_web/video/video.module#VideoModule'},
  { path: 'laws', loadChildren: './_web/laws/laws.module#LawsModule'},
  { path: 'guide', loadChildren: './_web/guidance/guidance.module#GuidanceModule'},
  { path: 'news', loadChildren: './_web/news/news.module#NewsModule'},
  { path: 'userAdmin', loadChildren: './_web/admin/user-admin/user-admin.module#UserAdminModule'},
  { path: 'companyAdmin', loadChildren: './_web/admin/company-admin/company-admin.module#CompanyAdminModule'},
  { path: 'resume/:resume_id', loadChildren: './_web/admin/resume-preview/resume-preview.module#ResumePreviewModule'},
  { path: 'login', loadChildren: './_web/login/login.module#LoginModule'},
  { path: 'register', loadChildren: './_web/register/register.module#RegisterModule'},
  { path: 'forgetPwd', loadChildren: './_web/retrieve-password/retrieve-password.module#RetrievePasswordModule'},
  { path: 'error', loadChildren: './_web/error-page/error-page.module#ErrorPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }