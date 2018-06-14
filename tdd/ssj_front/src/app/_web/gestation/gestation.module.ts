import { NgModule } from '@angular/core';
import { CommonSharedModule } from '../../_shared/common-shared/_common-shared.module';
import { GestationRoutingModule } from './gestation.routing';
import { GestationComponent } from './gestation.component';
import { GestationHeaderComponent } from './component/gestation-header/gestation-header.component';
import { GestationNavComponent } from './component/gestation-nav/gestation-nav.component';
import { GestationContentComponent } from './content/index/gestation-content.component';
import { NewsComponent } from './content/index/news/news.component';
import { ProgramComponent } from './content/index/program/program.component';
import { TeacherComponent } from './content/index/teacher/teacher.component';
import { BaseComponent } from './content/index/base/base.component';
import { TrainComponent } from './content/index/train/train.component';
import { IncubationBaseComponent } from './content/incubation-base/incubation-base.component';
import { MentorsComponent } from './content/mentors/mentors.component';
import { StartupProjectComponent } from './content/startup-project/startup-project.component';
import { ProjectDetailsComponent } from './content/startup-project/project-details/project-details.component';
import { MentorDetailsComponent } from './content/mentors/mentor-details/mentor-details.component';
import { BaseDetailsComponent } from './content/incubation-base/base-details/base-details.component';
import { PersonCenterComponent } from './content/person-center/person-center.component';


const GESTATIONCOMPONENT = [
  GestationComponent,
  GestationHeaderComponent,
  GestationNavComponent,
  GestationContentComponent,
  NewsComponent,
  ProgramComponent,
  TeacherComponent,
  BaseComponent,
  TrainComponent,
  IncubationBaseComponent,
  MentorsComponent,
  StartupProjectComponent,
  ProjectDetailsComponent
]
@NgModule({
  imports: [
    CommonSharedModule,
    GestationRoutingModule
  ],
  declarations: [
    ...GESTATIONCOMPONENT,
    MentorDetailsComponent,
    BaseDetailsComponent,
    PersonCenterComponent,

  ]
})
export class GestationModule { }
