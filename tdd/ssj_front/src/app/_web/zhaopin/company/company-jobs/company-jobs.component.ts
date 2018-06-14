import { Component, OnInit } from '@angular/core';
import { JobsInfoServiceService } from '../../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  public jobs = [];
  public isJobs:Boolean = false;
  constructor(
    private jobsInfoService : JobsInfoServiceService
  ) {}

  ngOnInit() {
    let _companyInfo = this.jobsInfoService.getLocalStorageItem("companyPreviewInfo");
    if(_companyInfo){
      this.jobsInfoService.setTitle('职位列表-' + _companyInfo['name'] + '-' + _companyInfo['company_status']['name']); /* 设置页面标题 */
    }
    this.getJobsList();
  }
  getJobsList(){
    if(this.jobsInfoService.getLocalStorageItem('companyHomePageJobs')){
      this.jobs = this.jobsInfoService.getLocalStorageItem('companyHomePageJobs');
      this.isJobs = false;
    }else{
      let _id = null;
      let arr = window.location.pathname.split('\/').slice(1);
      arr.forEach( (el,i) =>{
        if(el === 'company'){
          _id = arr[i+1];
          return;
        }
      });
      this.jobsInfoService.getCompanyJobsInfo({company_id: _id}).then(res=>{
        if(res['code'] == 1){
          if(res['data']){
            this.jobs = res['data'];
            this.isJobs = false;
            this.jobsInfoService.setLocalStorageItemAnyTime('companyHomePageJobs', this.jobs, 1);
          }else{
            this.isJobs = true;
          }
        }
      })
    }
  }

}
