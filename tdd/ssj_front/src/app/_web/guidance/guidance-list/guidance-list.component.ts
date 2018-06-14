import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuidanceService } from '../_guidance-servcie/guidance.service';

@Component({
  selector: 'app-guidance-list',
  templateUrl: './guidance-list.component.html',
  styleUrls: ['./guidance-list.component.css']
})
export class GuidanceListComponent implements OnInit {
  public infos = {};
  public infoList = [];
  public guideTabs = [];
  public _loading:Boolean = false; //加载数据
  public options = {
    'type_id' : null,
    'page': null
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private guidanceService: GuidanceService
  ){}

  ngOnInit() {
    this.activatedRoute.params.subscribe( params=>{
      let _typeID = params['typeId'];
      if(_typeID){
        this.options.type_id = _typeID;
        this.getGuidanceAffairs();
      }else{
        this.getGuidanceTabs();
      }
    });
  }
  // 获取新闻类别列表
  getGuidanceAffairs(){
    this.guidanceService.getGuidanceAffairsList(this.options).then(res=>{
      if(res['code'] === 1){
        this.guidanceService.setTitle('办事指南-天府新区公共就业服务网');
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
    });
  }
  // 获取指南分类列表及id， 设置title
  getGuidanceTabs(){
    if(this.guidanceService.getLocalStorageItem('guideTabs')){
      this.guideTabs = this.guidanceService.getLocalStorageItem('guideTabs');
      this.options.type_id = this.guideTabs[0].id;
      this.guidanceService.setTitle(this.guideTabs[0].name);
      this.getGuidanceAffairs();
    }else{
      this.guidanceService.getGuidanceTabs().then(res=>{
        if(res['code'] === 1 && res['data'].length != 0){
          this.guideTabs = res['data'];
          this.options.type_id = this.guideTabs[0].id;
          this.guidanceService.setTitle(this.guideTabs[0].name);
          this.getGuidanceAffairs();
        }else{
          this.guideTabs = [];
        }
      })
    }
  }
  // 页码变化
  pageChangeClick(value){
    this.options.page = value;
    this.getGuidanceAffairs();
  }
}
