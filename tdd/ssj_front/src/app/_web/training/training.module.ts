import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';
import { TrainingRoutingModule } from './training.routing';
import { TrainHomeComponent } from './train-home/train-home.component';
import { TrainingComponent } from './training.component';

const LAWSCOMPONENT = [
    TrainingComponent,
    TrainHomeComponent
];

@NgModule({
  imports: [
    CommonSharedModule,
    TrainingRoutingModule
  ],
  declarations: [
    ...LAWSCOMPONENT
  ],
  providers: [
      
  ]
})
export class TrainingModule { }