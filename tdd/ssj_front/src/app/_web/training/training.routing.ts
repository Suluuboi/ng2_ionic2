import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { TrainHomeComponent } from './train-home/train-home.component';

const routes: Routes = [
    {
        path: '', component: TrainingComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', component: TrainHomeComponent, data:{title: '在线培训-天府新区公共就业服务网'}},
        ]
    },
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule { }