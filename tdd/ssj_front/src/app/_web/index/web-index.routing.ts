import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 首页-home
import { IndexComponent } from './index.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '', component: IndexComponent,
        children: [
            { path: '', component: HomeComponent, data: { title: '天府新区公共就业服务网' } },
            { path: 'index', component: HomeComponent, data: { title: '天府新区公共就业服务网' } }
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebIndexRoutingModule { }