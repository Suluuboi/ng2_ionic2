import { NgModule } from '@angular/core';
//富文本编辑器
import { CKEditorModule } from 'ng2-ckeditor';
// 用户中心共享组件
import { AdminSiderComponent } from './admin-sider/admin-sider.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { CascaderComponent } from './cascader/cascader.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TopComponent } from './top/top.component';
import { CommonSharedModule } from '../common-shared/_common-shared.module';

const _ADMINSHARED = [
  AdminSiderComponent,
  CascaderComponent,
  ChangePwdComponent,
  DatePickerComponent,
  JobCategoryComponent,
  TextEditorComponent,
  TopComponent
];

@NgModule({
  imports: [
    CommonSharedModule,
    CKEditorModule
  ],
  declarations: [
    ..._ADMINSHARED
  ],
  exports: [
    CommonSharedModule,
    CKEditorModule,
    ..._ADMINSHARED
  ]
})
export class AdminSharedModule { }
