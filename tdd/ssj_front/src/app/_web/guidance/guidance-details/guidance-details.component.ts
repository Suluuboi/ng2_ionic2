import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuidanceService } from '../_guidance-servcie/guidance.service';

@Component({
  selector: 'app-guidance-details',
  templateUrl: './guidance-details.component.html',
  styleUrls: ['./guidance-details.component.css']
})
export class GuidanceDetailsComponent implements OnInit {

  public guideId; //单个新闻内容id
  public detail = {}; // 新闻内容
  public isData:Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private guidanceService: GuidanceService
  ) { }

  ngOnInit() {
    this.guidanceService.setTitle('办事指南');
    this.activatedRoute.params.subscribe( params=>{
        this.guideId = params['id'];
        this.getGuidanceDetailsInfo({id: this.guideId});
    })
  }

  getGuidanceDetailsInfo(opt){
    this.guidanceService.getGuidanceDetail(opt).then(res=>{
      if(res['code'] === 1){
        this.isData = true;
        this.detail = res['data'];
        this.guidanceService.setTitle(this.detail['title']+'-办事指南'); /* 网页标题设置 */
      }else{
        this.isData = false;
      }
    })
  }

}
