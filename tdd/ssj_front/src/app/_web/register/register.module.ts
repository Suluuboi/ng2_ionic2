import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';

import { RegisterRoutingModule } from './register.routing';
import { RegisterComponent } from './register.component';
import { RegisterService } from './_register-service/register.service';
@NgModule({
  imports: [
    CommonSharedModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
