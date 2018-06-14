import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video.component';
import { VideoHomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '', component: VideoComponent,
        children: [
            { path: '', component: VideoHomeComponent, data: { title: '云视频系统-天府新区公共就业服务网' } },
            { path: 'video', component: VideoHomeComponent, data: { title: '云视频系统-天府新区公共就业服务网' } }
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetrievePwdRoutingModule { }