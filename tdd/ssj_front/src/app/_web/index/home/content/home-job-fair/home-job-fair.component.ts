import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../_index-service/index.service';

@Component({
  selector: 'home-job-fair',
  templateUrl: './home-job-fair.component.html',
  styleUrls: ['./home-job-fair.component.css']
})
export class HomeJobFairComponent implements OnInit {

  public infos = [];
  public isInfos:boolean = false;
  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.getzphInfos();
  }

  getzphInfos(){
    let limit = 5;
    this.indexService.getZphList({limit: limit}).then(res=>{
      if(res['code'] == 1){
        this.infos = res['data'];
        this.isInfos = false;
      }else{
        this.infos = [];
        this.isInfos = true;
      }
    })
  }
}
