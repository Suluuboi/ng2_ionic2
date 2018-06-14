import { Component, OnInit } from '@angular/core';
import { ZphService } from '../_zhaopin-service/web-zph.service';

@Component({
  selector: 'app-job-interview',
  templateUrl: './job-interview.component.html',
  styleUrls: ['./job-interview.component.css']
})
export class JobInterviewComponent implements OnInit {

  public zphList = [];// 招聘会列表
  public isJobfair:Boolean = false;// 是否存在招聘会
  public expires:Boolean = false; // 是否过期 false： 未过期
  
  constructor(
    private zphService : ZphService
  ) { }

  ngOnInit() {
    this.getFairlist();
    
  }
  getFairlist(){
    this.zphService.jobFairsInfoList().then(res=>{
      if(res['code'] === 1){
        this.zphList = res['data'];
        if(this.zphList.length != 0){
          this.isJobfair = false;
        }else{
          this.isJobfair = true;
          this.zphService.showMessage('warning', '暂无招聘会信息');
        }
      }else{
        this.isJobfair = true;
      }
    })
  }
}
