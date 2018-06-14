import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawsComponent } from './laws.component';
import { LawsDetailComponent } from './laws-detail/laws-detail.component';
import { LawsListComponent } from './laws-list/laws-list.component';

const routes: Routes = [
    { path: '', component: LawsComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: LawsListComponent },
        { path: 'detail/:id', component: LawsDetailComponent },
    ]
},
    { path: "**", redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LawsRoutingModule { }