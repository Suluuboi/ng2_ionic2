import { Component, OnInit } from '@angular/core';
import { GuidanceService } from '../_guidance-servcie/guidance.service';
import { ApiData } from '../../../menu_config/data';

@Component({
  selector: 'app-guidance-home',
  templateUrl: './guidance-home.component.html',
  styleUrls: ['./guidance-home.component.css']
})
export class GuidanceHomeComponent implements OnInit {

  public guidanceInfos: any[] = [];
  constructor(
    private guidanceService: GuidanceService
  ) {}

  ngOnInit() {
    this.getGuidanceInfoList();
  }

  getGuidanceInfoList(){
    this.guidanceService.getGuidanceHomeInfos().then(res=>{
      if(res['code'] === 1){
        if(res['data'] instanceof Array){
          this.guidanceInfos = res['data'];
        }else{
          this.guidanceInfos = [];
        }
      }
    })
  }
}