import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';

import { JobsInfoServiceService } from './_zhaopin-service/jobs-info-service.service';
import { ZphService } from './_zhaopin-service/web-zph.service';

import { WebZhaopinComponent } from './zhaopin.component';
// 主导航对应招聘模块下的所有内容
import { IndexLoginComponent } from './index-login/index-login.component';
import { MapRecruitmentComponent } from './map-recruitment/map-recruitment.component';// 地图招聘
import { JobsListShowComponent } from './jobs/jobs.component';// 职位搜索
import { JobsShowComponent } from './jobs-show/jobs-show.component';// 职位展示页面
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { ChoeseMenuComponent } from './choese-menu/choese-menu.component';
import { CompanyComponent } from './company/company.component';
import { CompanyHomeComponent } from './company/company-home/company-home.component';
import { CompanyJobsComponent } from './company/company-jobs/company-jobs.component';
// 招聘会
import { JobInterviewComponent } from './job-fair/job-interview.component';
import { ZphDetailComponent } from './job-fair/zph-detail/zph-detail.component';;
import { PositionRegisterComponent } from './position-register/position-register.component';
import { AddWorkExprienceComponent } from './position-register/add-work-exprience/add-work-exprience.component'
import { WebZhaopinRoutingModule } from './web-zhaopin.routing';
import { NgxAmapModule } from 'ngx-amap';

const _WEBZHAOPINCOMPONENT = [
  IndexLoginComponent,
  WebZhaopinComponent,
  JobsListShowComponent,
  JobsShowComponent,
  JobsDetailComponent,
  MapRecruitmentComponent,
  ChoeseMenuComponent,
  CompanyComponent,
  CompanyHomeComponent,
  CompanyJobsComponent,
  // 招聘会
  JobInterviewComponent,
  ZphDetailComponent,
  // 求职登记
  PositionRegisterComponent,
  AddWorkExprienceComponent
];

const _SERVICE = [
  JobsInfoServiceService,
  ZphService
]

@NgModule({
  imports: [
    CommonSharedModule,
    WebZhaopinRoutingModule,
    NgxAmapModule.forRoot({
      apiKey: 'd71f343e9d47a16573212769f4f21d2b'
    })
  ],
  declarations: [
    ..._WEBZHAOPINCOMPONENT
  ],
  providers: [
    ..._SERVICE
  ],
  entryComponents: [IndexLoginComponent]
})
export class WebZhaopinModule { }
