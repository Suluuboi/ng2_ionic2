import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';
import { WebIndexRoutingModule } from './web-index.routing';
import { IndexComponent } from './index.component';
// home页面的内容
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/component/banner/banner.component';
import { HomeJobFairComponent } from './home/content/home-job-fair/home-job-fair.component';
import { HomeTrainingComponent } from './home/content/home-training/home-training.component';
import { SidebarComponent } from './home/component/sidebar/sidebar.component';
import { PolicyComponent } from './home/content/policy/policy.component';
import { ContentComponent } from './home/content/content.component';

// 主导航栏对应其它页面
import { PositionInformationComponent } from './home/content/position-information/position-information.component';
import { IndexService } from './_index-service/index.service';

const _WEBHOMECOMPONENT = [
    IndexComponent,
    HomeComponent,
    SidebarComponent,
    BannerComponent,
    ContentComponent,
    HomeJobFairComponent,
    HomeTrainingComponent,
    PolicyComponent,  
    PositionInformationComponent
];
const _SERVICE = [
  IndexService
]

@NgModule({
  imports: [
    CommonSharedModule,
    WebIndexRoutingModule
  ],
  declarations: [
    ..._WEBHOMECOMPONENT
  ],
  providers: [
    ..._SERVICE
  ]
})
export class IndexModule { }
