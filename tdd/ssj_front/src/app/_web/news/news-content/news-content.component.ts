import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../news-service/news.service';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {

  public news_id; //单个新闻内容id
  public detail = {}; // 新闻内容
  public isData:Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService : NewsService
  ) { }

  ngOnInit() {
    this.newsService.setTitle('新闻中心');
    this.activatedRoute.params.subscribe( params=>{
        this.news_id = params['news_id'];
        this.getNewsShowDetails({article_id: this.news_id});
    })
  }

  getNewsShowDetails(opt){
    this.newsService.getNewsDetail(opt).then(res=>{
      if(res['code'] === 1){
        this.isData = true;
        this.detail = res['data'];
        this.newsService.setTitle(this.detail['data']['name']+'-新闻中心'); /* 网页标题设置 */
      }else{
        this.isData = false;
      }
    })
  }
}
