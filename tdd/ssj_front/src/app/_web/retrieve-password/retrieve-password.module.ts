import { NgModule } from '@angular/core';
import { CommonSharedModule } from '../../_shared/common-shared/_common-shared.module';

import { RetrievePwdRoutingModule } from './retrieve-password.routing';
import { RetrievePasswordComponent } from './retrieve-password.component';

@NgModule({
  imports: [
    CommonSharedModule,
    RetrievePwdRoutingModule
  ],
  declarations: [RetrievePasswordComponent]
})
export class RetrievePasswordModule { }
