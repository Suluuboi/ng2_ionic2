import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 主导航对应招聘模块下的所有内容
import { WebZhaopinComponent } from './zhaopin.component';
import { MapRecruitmentComponent } from './map-recruitment/map-recruitment.component';// 地图招聘
import { JobsListShowComponent } from './jobs/jobs.component';// 职位搜索
import { JobsShowComponent } from './jobs-show/jobs-show.component';// 职位展示页面
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { ChoeseMenuComponent } from './choese-menu/choese-menu.component';
import { CompanyComponent } from './company/company.component';
import { CompanyHomeComponent } from './company/company-home/company-home.component';
import { CompanyJobsComponent } from './company/company-jobs/company-jobs.component';
import { JobInterviewComponent } from './job-fair/job-interview.component';
import { ZphDetailComponent } from './job-fair/zph-detail/zph-detail.component';
import { PositionRegisterComponent } from './position-register/position-register.component';

const routes: Routes = [
    {
        path: '', component: WebZhaopinComponent, data: { title: '招聘' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full', data: { title: '招聘职位信息' } },
            { path: "home", component: JobsListShowComponent, data: { title: '招聘职位信息' } },
            { path: "map", component: MapRecruitmentComponent, data: { title: '地图招聘-职位信息' } },
            { path: "positionRegister", component: PositionRegisterComponent, data: { title: '求职登记' } },
            { path: 'zph', component: JobInterviewComponent, data: { title: '招聘会' } },//招聘会路由
            { path: 'zph/detail/:id', component: ZphDetailComponent },
            { path: "jobsDetails/:jobId", component: JobsDetailComponent },
            {
                path: "company/:companyId", component: CompanyComponent,
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: CompanyHomeComponent },
                    { path: 'jobs', component: CompanyJobsComponent }
                ]
            },
            { path: "**", redirectTo: 'error', pathMatch: 'full' }
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebZhaopinRoutingModule { }