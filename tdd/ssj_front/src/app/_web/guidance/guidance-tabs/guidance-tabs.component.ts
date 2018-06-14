import { Component, OnInit } from '@angular/core';
import { GuidanceService } from '../_guidance-servcie/guidance.service';

@Component({
  selector: 'app-guidance-tabs',
  templateUrl: './guidance-tabs.component.html',
  styleUrls: ['./guidance-tabs.component.css']
})
export class GuidanceTabsComponent implements OnInit {
  public typeName:string = '办事指南';
  public typeList = []; // 新闻分类列表
  constructor(
    private guidanceService: GuidanceService
  ) { }

  ngOnInit() {
    this.guidanceService.setTitle('办事指南');
    this.getGuidanceTabsList();
  }
  
  // 获取新闻类别
  getGuidanceTabsList(){
    this.guidanceService.getGuidanceTabs().then(res=>{
      if(res['code'] === 1 && res['data'].length != 0){
        this.typeList = res['data'];
        this.guidanceService.setLocalStorageItem('guideTabs', this.typeList);
      }else{
        this.typeList = [];
      }
    })
  }
}
