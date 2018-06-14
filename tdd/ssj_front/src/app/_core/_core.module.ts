import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// 全局服务service
import { LoginService } from './service/_user-service/login.service';
import { CheckMsgnumberService } from './service/_user-service/check-msgnumber.service';
import { LocalStorageService } from './service/_config-service/local-storage.service';
import { ChangePwdService } from './service/_user-service/change-pwd.service';
import { ConfigInfoService } from './service/_config-service/config-info.service';

const _SERVICE = [
  LoginService,
  CheckMsgnumberService,
  LocalStorageService,
  ChangePwdService,
  ConfigInfoService
];

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    ..._SERVICE
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        '核心模块已经加载，只能在AppModule中引入！');
    }
  }
}