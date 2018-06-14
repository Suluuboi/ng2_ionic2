import { Component, OnInit } from '@angular/core';
import { JobsInfoServiceService } from '../../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  public companyInfo = {};
  public isData :Boolean = false;
  public _center = [];
  public jobs = [];
  // 弹出信息窗口定位
  infoWindowOffset = {
    x: 0,
    y: -30
  };
  constructor(
    private jobsInfoService: JobsInfoServiceService
  ) { }

  ngOnInit() {
    this.setCompanyInfo();
  }

  setCompanyInfo(){
    this.companyInfo = this.jobsInfoService.getLocalStorageItem("companyPreviewInfo");
    if(this.companyInfo){
      this.jobsInfoService.setTitle(this.companyInfo['name'] + '-' + this.companyInfo['company_status']['name'] + '-公司主页'); /* 设置页面标题 */
      this.isData = true;
      this._center[0] = this.companyInfo['lng'];
      this._center[1] = this.companyInfo['lat'];
      this.jobsInfoService.getCompanyJobsInfo({company_id: this.companyInfo['id']}).then(res=>{
        if(res['code'] === 1){
          if(res['data']){
            this.jobs = res['data'];
            this.jobsInfoService.setLocalStorageItemAnyTime('companyHomePageJobs', this.jobs, 1);
          }
        }else{
        }
      })
    }else{
      this.isData = false;
    }
  }

}
