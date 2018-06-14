import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news-service/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public typeList = []; // 新闻分类列表
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.setTitle('新闻中心');
    this.getNewsClassList();
  }
  
  // 获取新闻类别
  getNewsClassList(){
    this.newsService.getNewsTypeList().then(res=>{
      if(res['code'] === 1 && res['data'].length != 0){
        this.typeList = res['data'];
      }else{
        this.typeList = [];
      }
    })
  }
}