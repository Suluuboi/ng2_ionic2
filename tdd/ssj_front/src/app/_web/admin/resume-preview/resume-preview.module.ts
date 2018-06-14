import { NgModule } from '@angular/core';
import { ResumePreviewComponent } from './resume-preview.component';
import { ResumePreviewRoutingModule } from './resume-preview.routing';
import { CommonSharedModule } from '../../../_shared/common-shared/_common-shared.module';
import { ResumePreviewService } from './resume-service/resume-preview.service';

@NgModule({
  imports: [
    ResumePreviewRoutingModule,
    CommonSharedModule
  ],
  declarations: [
    ResumePreviewComponent
  ],
  providers: [
    ResumePreviewService
  ]
})
export class ResumePreviewModule { }
