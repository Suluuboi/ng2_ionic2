import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';

import { LawsRoutingModule } from './laws.routing';
import { LawsInfoService } from './laws-service/laws.service';

import { LawsComponent } from './laws.component';
import { LawsDetailComponent } from './laws-detail/laws-detail.component';
import { LawsListComponent } from './laws-list/laws-list.component';

const LAWSCOMPONENT = [
    LawsComponent,
    LawsListComponent,
    LawsDetailComponent,
    LawsListComponent
];

@NgModule({
  imports: [
    CommonSharedModule,
    LawsRoutingModule
  ],
  declarations: [
    ...LAWSCOMPONENT
  ],
  providers: [
    LawsInfoService
  ]
})
export class LawsModule { }