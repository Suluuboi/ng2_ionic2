import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news-service/news.service';

@Component({
  selector: 'app-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.css']
})
export class NewsTypeComponent implements OnInit {

  public infos = {};
  public infoList = [];
  public typeList = [];
  public _loading:Boolean = false; //加载数据
  public scrollTop = 0; //滚动条高度
  public typeName = '';

  public options = {
    'category_id' : null,
    'page': null
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params=>{
        if(params['news_class']){
          this.options.category_id = params['news_class'];
          this.getNewsInfoList(this.options);
        }else{
          // get tabs list
          this.newsService.getNewsTypeList().then(res=>{
            if(res['code'] === 1 && res['data'].length != 0){
              this.typeList = res['data'];
              this.options.category_id = this.typeList[0].id;
            }else{
              this.typeList = [];
            }
            this.getNewsInfoList(this.options);
          })
        }
    });
  }

  // 获取新闻类别列表
  getNewsInfoList(opt){
    this.newsService.getNewsInfoList(opt).then(res=>{
      if(res['code'] === 1){
        if(res['data'].constructor !== Array){
          this._loading = false;
          this.infos = res['data'];
          this.infoList = this.infos['data'];
        }else{
          this._loading = true;
          this.infos = {};
          this.infoList = [];
        }
      }else{
        this._loading = true;
      }
    })
  }
  
  // 页码变化
  pageChangeClick(value){
    this.options.page = value;
    this.getNewsInfoList(this.options);
  }
}
