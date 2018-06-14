import { NgModule } from '@angular/core';
import { CommonSharedModule } from '../../_shared/common-shared/_common-shared.module';
import { VideoComponent } from './video.component';
import { VideoHomeComponent } from './home/home.component';
import { RetrievePwdRoutingModule } from './video.routing';

@NgModule({
  imports: [
    CommonSharedModule,
    RetrievePwdRoutingModule
  ],
  declarations: [
    VideoComponent,
    VideoHomeComponent
  ]
})
export class VideoModule { }
