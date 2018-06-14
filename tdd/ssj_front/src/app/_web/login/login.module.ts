import { NgModule } from '@angular/core';

import { CommonSharedModule } from '../../_shared/common-shared/_common-shared.module';
import { LoginRoutingModule } from './login.routing';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonSharedModule
  ],
  declarations: [
    UserLoginComponent
  ]
})
export class LoginModule { }
