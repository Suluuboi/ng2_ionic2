import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../_index-service/index.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  public tabs = [];
  public isTabs = false;
  public newsTypeId = null;
  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList(){
    this.indexService.getNewsList().then(res=>{
      if(res['code'] == 1){
        this.isTabs = true;
        let _data = res['data'];
        this.tabs = _data;
        this.newsTypeId = this.tabs[0].id;
        if(_data.length > 10){
          this.tabs = _data.slice(0,10);
        }
      }
    })
  }
  changTabId(id){
    this.newsTypeId = id;
  }
}
