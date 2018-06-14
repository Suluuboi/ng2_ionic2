import { NgModule } from '@angular/core';
import { CommonSharedModule } from './../../_shared/common-shared/_common-shared.module';
import { NewsRoutingModule } from './news.routing';

import { NewsComponent } from './news.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsTypeComponent } from './news-type/news-type.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './news-service/news.service';

const LAWSCOMPONENT = [
    // 。。。新闻部分
    NewsComponent,
    NewsListComponent,
    NewsContentComponent,
    NewsTypeComponent,
];

@NgModule({
  imports: [
    CommonSharedModule,
    NewsRoutingModule
  ],
  declarations: [
    ...LAWSCOMPONENT
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }