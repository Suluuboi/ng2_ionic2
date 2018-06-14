import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestationComponent } from './gestation.component';
import { GestationContentComponent } from './content/index/gestation-content.component';
import { IncubationBaseComponent } from './content/incubation-base/incubation-base.component';
import { MentorsComponent } from './content/mentors/mentors.component';
import { StartupProjectComponent } from './content/startup-project/startup-project.component';
import { ProjectDetailsComponent } from './content/startup-project/project-details/project-details.component';
import { MentorDetailsComponent } from './content/mentors/mentor-details/mentor-details.component';
import { BaseDetailsComponent } from './content/incubation-base/base-details/base-details.component';
import { PersonCenterComponent } from './content/person-center/person-center.component';
const routes: Routes = [
    {
        path: '', component: GestationComponent, data: { title: '云孵化平台-天府新区公共就业服务网' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: GestationContentComponent, data: { title: '云孵化平台-天府新区公共就业服务网' } },
            { path: 'startup-project', component: StartupProjectComponent},
            { path: 'project-details', component: ProjectDetailsComponent },
            { path: 'incubation-base', component: IncubationBaseComponent },
            { path: 'mentors', component: MentorsComponent },
            { path: 'mentor-details', component: MentorDetailsComponent },
            { path: 'base-details', component: BaseDetailsComponent },
            { path: 'person-center', component: PersonCenterComponent }
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestationRoutingModule { }