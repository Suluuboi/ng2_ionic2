import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyLoginGuard } from './guard/company-login.guard';
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
import { JobFairIntentionComponent } from './job-fair-list/job-fair-intention/job-fair-intention.component';
import { JobfairReturnVisitComponent } from './job-fair-list/jobfair-return-visit/jobfair-return-visit.component';
import { JobFairCompanyAddComponent } from './job-fair-list/job-fair-company-add/job-fair-company-add.component';
import { ConferenceRoomComponent } from './conference-room/conference-room.component';
import { CompanyPermissionGuard } from './guard/company-permission.guard';

const routes: Routes = [
    {
        path: "", component: CompanyAdminComponent, data: { title: '单位用户中心' },
        canActivate: [CompanyLoginGuard],
        children: [
            // 单位用户中心管理
            { path: '', redirectTo: 'companyHome', pathMatch: 'full' },//管理首页 companyHome
            { path: 'companyHome', component: HomePageComponent, data: { title: '首页' } },//管理首页
            { path: 'companyInfo', component: BaseInfoComponent, data: { title: '用户资料' } },//单位资料 
            { path: 'companyMap', component: CompanyMapComponent, canActivate: [CompanyPermissionGuard], data: { title: '地图中心-单位地图' } },//单位地图
            { path: 'conference', component: ConferenceRoomComponent, canActivate: [CompanyPermissionGuard], data: { title: '会议室' } }, //会议室 
            { path: 'companyPwd', component: PwdManagerComponent, data: { title: '密码修改-用户中心' } }, //密码管理 
            { path: 'jobadd', component: JobAddComponent, canActivate: [CompanyPermissionGuard], data: { title: '职位发布' } },//发布职位
            { path: 'jobEdit/:job_id', component: JobEditComponent },//编辑职位
            { path: 'recruit', component: InRecruitComponent, canActivate: [CompanyPermissionGuard], data: { title: '正在招聘的职位' } },//招聘中的职位
            { path: 'jobFair', component: JobFairComponent, canActivate: [CompanyPermissionGuard], data: { title: '招聘会搜索' }},//招聘会
            { path: 'jobFair/companyAdd/:jobfair_id', component: JobFairCompanyAddComponent, data: { title: '添加公司-招聘会' }}, //招聘会添加公司
            { path: 'jobFairIntention/:id', component: JobFairIntentionComponent, data: { title: '意向性协议' } },//招聘会
            { path: 'intentionReturn/:id', component: JobfairReturnVisitComponent, data: { title: '意向性协议回访' } },//招聘会
            { path: 'jobFairAdd', component: JobFairAddComponent, canActivate: [CompanyPermissionGuard], data: { title: '添加招聘会' } },//添加招聘会
            { path: 'jobFairEdit/:id', component: JobFairEditComponent, data: { title: '修改招聘会' } },//修改招聘会
            { path: 'seekers', component: JobSeekersComponent, canActivate: [CompanyPermissionGuard], data: { title: '人才搜索' } },//搜索人才
            { path: 'resumeManage', component: ResumeManageComponent, canActivate: [CompanyPermissionGuard], data: { title: '人才简历管理' } },//简历管理
            { path: "**", redirectTo: 'error', pathMatch: 'full' }
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyAdminRoutingModule { }