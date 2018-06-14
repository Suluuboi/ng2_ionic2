import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LawsInfoService } from '../laws-service/laws.service';

@Component({
  selector: 'app-laws-detail',
  templateUrl: './laws-detail.component.html',
  styleUrls: ['./laws-detail.component.css']
})
export class LawsDetailComponent implements OnInit {
    public law_id; //单个法律内容id
    public detail = {}; // 法律内容
    public isData:Boolean = false;
    constructor(
      private activatedRoute: ActivatedRoute,
      private lawsInfoService : LawsInfoService
    ) { }

  ngOnInit() {
    this.lawsInfoService.setTitle('法律法规');
    this.activatedRoute.params.subscribe( params=>{
        this.law_id = params['id'];
        this.getLawsShowDetails({id: this.law_id});
    })
  }

  getLawsShowDetails(opt){
    this.lawsInfoService.getLawsDetail(opt).then(res=>{
      if(res['code'] === 1){
        this.isData = true;
        this.detail = res['data'];
        this.lawsInfoService.setTitle(this.detail['title']+'-法律法规'); /* 网页标题设置 */
      }else{
        this.isData = false;
      }
    })
  }
}