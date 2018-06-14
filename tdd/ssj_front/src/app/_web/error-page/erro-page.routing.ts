import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page.component';
const routes: Routes = [
  { path: "", component: ErrorPageComponent, data: { title: '访问路径出错-错误页面' }}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErroPageRoutingModule { }