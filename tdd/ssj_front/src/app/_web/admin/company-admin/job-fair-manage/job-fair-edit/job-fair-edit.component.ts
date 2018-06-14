import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-fair-edit',
  templateUrl: './job-fair-edit.component.html',
  styleUrls: ['./job-fair-edit.component.css']
})
export class JobFairEditComponent implements OnInit {
  public jobFairManage = 'editJobFair';
  public fair_id;
  constructor(
    private activatedRoute: ActivatedRoute,
    private companyInfoService: CompanyInfosService
  ) {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.fair_id = params['id'];
    })
  }

  ngOnInit() {
    
  }
  
  getJobFairInfos(option){
    delete option.id;
    option['fair_id'] = this.fair_id;
    this.companyInfoService.updateJobfairInCompanyAdmin(option).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this.companyInfoService.navTo('/companyAdmin/jobFair');
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
}