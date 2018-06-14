import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../_index-service/index.service';

@Component({
  selector: 'app-position-information',
  templateUrl: './position-information.component.html',
  styleUrls: ['./position-information.component.css']
})
export class PositionInformationComponent implements OnInit {

  public jobs = [];//最新职位
  public isJobs: Boolean = false;
 
  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.getjobs();
  }

  getjobs(){
    this.indexService.getJobsList().then(res=>{
      if(res['code'] === 1 && res['data'].length != 0){
        this.isJobs = true;
        let data = res['data'];
        this.jobs = data;
        if(data.length >6){
          this.jobs = data.slice(0,6);
        }
      }
    })
  }
}
