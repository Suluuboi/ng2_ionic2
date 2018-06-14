import { NgModule } from '@angular/core';
// 共享模块
import { AdminSharedModule } from '../../../_shared/admin-shared/admin-shared.module';

import { UserAdminRoutingModule } from './user-admin.routing';
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
// 简历修改页面各个子组件
import { AmendResumeComponent } from './amend-resume/amend-resume.component';
import { EducationExperienceComponent } from './amend-resume/education-experience/education-experience.component';
import { JobIntentionShowComponent } from './amend-resume/job-intention-show/job-intention-show.component';
import { ProjectExperienceComponent } from './amend-resume/project-experience/project-experience.component';
import { SelfEvaluationComponent } from './amend-resume/self-evaluation/self-evaluation.component';
import { SkillsExperienceComponent } from './amend-resume/skills-experience/skills-experience.component';
import { TrainingExperienceComponent } from './amend-resume/training-experience/training-experience.component';
import { UserInfoShowComponent } from './amend-resume/user-info-show/user-info-show.component';
import { WorksExperienceComponent } from './amend-resume/works-experience/works-experience.component';
import { OthersInformationComponent } from './amend-resume/others-information/others-information.component';
import { UserDatePickerComponent } from './amend-resume/user-date-picker/user-date-picker.component';

import { UserPermissionGuard } from './guard/user-permission.guard';
import { UserLoginGuard } from './guard/user-login.guard';
import { UserInfoLeaveGuard } from './guard/user-info-leave.guard';
import { UserInfosService } from './user-admin-service/user-admin.service';

const _USREADMINCOMPONENT = [
  UserAdminComponent,
  UserHomePageComponent,
  UserInfoComponent,
  CreateResumeComponent,
  UserResumesComponent,
  UserPwdManagerComponent,
  AppliedJobsComponent,
  ResumesViewedComponent,
  JobsCollectComponent
];
const _AMENDRESUMESCOMPONENT = [
  AmendResumeComponent,
  EducationExperienceComponent,
  JobIntentionShowComponent,
  OthersInformationComponent,
  ProjectExperienceComponent,
  SelfEvaluationComponent,
  SkillsExperienceComponent,
  TrainingExperienceComponent,
  UserInfoShowComponent,
  WorksExperienceComponent,
  UserDatePickerComponent
];
@NgModule({
  imports: [
    AdminSharedModule,
    UserAdminRoutingModule
  ],
  declarations: [
    ..._USREADMINCOMPONENT,
    ..._AMENDRESUMESCOMPONENT
  ],
  providers: [
    UserLoginGuard,
    UserPermissionGuard,
    UserInfoLeaveGuard,
    UserInfosService
  ]
})
export class UserAdminModule { }