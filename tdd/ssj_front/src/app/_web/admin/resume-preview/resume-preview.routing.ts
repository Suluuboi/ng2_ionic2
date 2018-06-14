import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumePreviewComponent } from './resume-preview.component';


const routes: Routes = [
    {path: '', component: ResumePreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumePreviewRoutingModule { }