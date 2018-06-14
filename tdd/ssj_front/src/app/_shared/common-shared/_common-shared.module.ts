import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// 头部
import { HeaderComponent } from './component/header/header.component';
import { HeadTopComponent } from './component/header/head-top/head-top.component';
import { HeadMiddleComponent } from './component/header/head-middle/head-middle.component';
import { HeadNavComponent } from './component/header/head-nav/head-nav.component';
// 底部
import { FooterComponent } from './component/footer/footer.component';

// 管道pipe
import { ObjToArrayPipe } from './pipe/obj-to-array.pipe';
import { SafeHtmlPipe } from './pipe/safe-html-pipe.pipe';
import { ShowTimePipe } from './pipe/show-time.pipe';
import { WeekChangePipe } from './pipe/week-change.pipe';
import { AgeChangePipe } from './pipe/age-change.pipe';
// 搜索框
import { SearchContentComponent } from './search-content/search-content.component';
import { LoginComponent } from './login/login.component';

const _PIPE = [
  ObjToArrayPipe,
  SafeHtmlPipe,
  ShowTimePipe,
  WeekChangePipe,
  AgeChangePipe
];
const _COMPONENT = [
  HeaderComponent,
  HeadTopComponent,
  HeadMiddleComponent,
  HeadNavComponent,
  FooterComponent,
  SearchContentComponent,
  LoginComponent
];

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations: [
    ..._PIPE,
    ..._COMPONENT
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    ..._PIPE,
    HeaderComponent,
    FooterComponent,
    SearchContentComponent
  ],
  entryComponents: [LoginComponent]
})
export class CommonSharedModule { }