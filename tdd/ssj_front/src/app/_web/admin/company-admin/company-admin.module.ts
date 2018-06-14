import { NgModule } from '@angular/core';
// 共享模块
import { AdminSharedModule } from '../../../_shared/admin-shared/admin-shared.module';
// 路由模块
import { CompanyAdminRoutingModule } from './company-admin.routing';
// 组件
import { CompanyAdminComponent } from './company-admin.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { GmapComponent } from './company-map/gmap/gmap.component';
import { CompanyMapComponent } from './company-map/company-map.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InRecruitComponent } from './in-recruit/in-recruit.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditComponent } from './job-add/job-edit/job-edit.component';
import { JobFormComponent } from './job-add/job-form/job-form.component';
import { JobFairComponent } from './job-fair-list/job-fair.component';
import { JobSeekersComponent } from './job-seekers/job-seekers.component';
import { PwdManagerComponent } from './pwd-manager/pwd-manager.component';
import { ResumeManageComponent } from './resume-manage/resume-manage.component';
import { JobFairAddComponent } from './job-fair-manage/job-fair-add/job-fair-add.component';
import { JobFairEditComponent } from './job-fair-manage/job-fair-edit/job-fair-edit.component';
import { JobFairFormComponent } from './job-fair-manage/job-fair-form/job-fair-form.component';
import { UploadFileComponent } from './job-fair-list/upload-file/upload-file.component';
import { JobFairIntentionComponent } from './job-fair-list/job-fair-intention/job-fair-intention.component';
import { IntentionFormComponent } from './job-fair-list/job-fair-intention/intention-form/intention-form.component';
import { JobfairReturnVisitComponent } from './job-fair-list/jobfair-return-visit/jobfair-return-visit.component';
import { ReturnVisitFormComponent } from './job-fair-list/jobfair-return-visit/return-visit-form/return-visit-form.component';
import { JobFairCompanyAddComponent } from './job-fair-list/job-fair-company-add/job-fair-company-add.component';
import { ConferenceRoomComponent } from './conference-room/conference-room.component';
import { ConferenceRoomFormComponent } from './conference-room/conference-room-form/conference-room-form.component';
import { CompanyLoginGuard } from './guard/company-login.guard';
import { CompanyPermissionGuard } from './guard/company-permission.guard';
import { CompanyInfosService } from './company-admin-service/company-infos.service';
import { NgxAmapModule } from 'ngx-amap';


const _COMPANYADMINCOMPONENT = [
  CompanyAdminComponent,
  BaseInfoComponent,
  GmapComponent,
  CompanyMapComponent,
  HomePageComponent,
  InRecruitComponent,
  JobAddComponent,
  JobEditComponent,
  JobFormComponent,
  JobFairComponent,
  JobSeekersComponent,
  PwdManagerComponent,
  ResumeManageComponent,
  JobFairAddComponent,
  JobFairEditComponent,
  JobFairFormComponent,
  UploadFileComponent,
  JobFairIntentionComponent,// 意向性协议,
  IntentionFormComponent,
  JobfairReturnVisitComponent,
  ReturnVisitFormComponent,
  JobFairCompanyAddComponent,
  ConferenceRoomComponent,// 会议室
  ConferenceRoomFormComponent
];

const _SERVICE = [
  CompanyInfosService
];

const _GUARD = [
  CompanyLoginGuard,
  CompanyPermissionGuard
];

@NgModule({
  imports: [
    AdminSharedModule,
    CompanyAdminRoutingModule,
    NgxAmapModule.forRoot({
      apiKey: 'd71f343e9d47a16573212769f4f21d2b'
    })
  ],
  declarations: [
    ..._COMPANYADMINCOMPONENT
  ],
  providers: [
    ..._GUARD,
    ..._SERVICE
  ],
  entryComponents: [
    UploadFileComponent,
    IntentionFormComponent,
    ReturnVisitFormComponent,
    ConferenceRoomFormComponent
  ]
})
export class CompanyAdminModule { }
