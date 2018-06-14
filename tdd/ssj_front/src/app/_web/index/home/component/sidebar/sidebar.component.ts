import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../_index-service/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public latestNews = []; // 职位类别 一级
  constructor(
    private indexService : IndexService
  ) {
    this.getNewsListInfo(10);
  }

  ngOnInit() {

  }
  getNewsListInfo(limit){
    this.indexService.getLatestArticles({limit: limit}).then(res=>{
      if(res['code'] === 1){
        this.latestNews = res['data'];
      }
    }).catch(()=>{
      this.latestNews = [];
    })
  }

}
