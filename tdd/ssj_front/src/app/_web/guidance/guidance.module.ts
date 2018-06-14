import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';
import { GuidanceService } from './_guidance-servcie/guidance.service';
import { GuidanceRoutingModule } from './guidance.routing.module';
import { GuidanceComponent } from './guidance.component';
import { GuidanceHomeComponent } from './guidance-home/guidance-home.component';
import { GuidanceListComponent } from './guidance-list/guidance-list.component';
import { GuidanceTabsComponent } from './guidance-tabs/guidance-tabs.component';
import { GuidanceDetailsComponent } from './guidance-details/guidance-details.component';

const GUIDANCECOMPONENT = [
    GuidanceComponent,
    GuidanceHomeComponent,
    GuidanceTabsComponent,
    GuidanceListComponent,
    GuidanceDetailsComponent
]

@NgModule({
  imports: [
    CommonSharedModule,
    GuidanceRoutingModule
  ],
  declarations: [
    ...GUIDANCECOMPONENT
  ],
  providers: [
    GuidanceService
  ]
})
export class GuidanceModule { }
