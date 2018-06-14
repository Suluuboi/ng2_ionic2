import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsTypeComponent } from './news-type/news-type.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
    {
        path: '', component: NewsComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', component: NewsListComponent,
                children: [
                    { path: '', redirectTo: 'type', pathMatch: 'full'},
                    { path: 'type', component: NewsTypeComponent },
                    { path: 'type/:news_class', component: NewsTypeComponent },
                    { path: 'detail/:news_id', component: NewsContentComponent }
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
export class NewsRoutingModule { }