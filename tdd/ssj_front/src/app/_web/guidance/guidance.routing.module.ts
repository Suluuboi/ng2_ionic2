import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidanceComponent } from './guidance.component';
import { GuidanceHomeComponent } from './guidance-home/guidance-home.component';
import { GuidanceTabsComponent } from './guidance-tabs/guidance-tabs.component';
import { GuidanceListComponent } from './guidance-list/guidance-list.component';
import { GuidanceDetailsComponent } from './guidance-details/guidance-details.component';

const routes: Routes = [
    {
        path: '', component: GuidanceComponent, data: { title: '天府新区公共就业服务网' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: GuidanceHomeComponent, data: { title: '办事指南-首页' } },
            {
                path: 'tabs', component: GuidanceTabsComponent, data: { title: '办事指南-列表' },
                children: [
                    { path: '', redirectTo: 'affairs', pathMatch: 'full' },
                    { path: 'affairs', component: GuidanceListComponent, data: { title: '办事指南-分类列表' } },
                    { path: 'affairs/:typeId', component: GuidanceListComponent, data: { title: '办事指南-分类列表' } },
                    { path: 'details/:id', component: GuidanceDetailsComponent, data: { title: '办事指南-详情' } }
                ]
            },
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuidanceRoutingModule { }