import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  public editJobInfo = true;
  public job_id:number; // 获取当前对应的职位id
  public jobInfo; // 当前职位详情
  constructor(
    private activatedRoute : ActivatedRoute,
    private companyInfosService : CompanyInfosService
  ) { }
  
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.job_id = params['job_id'];
    })
  }

  getFormValue(value){
    let option = Object.assign(value, {job_id: this.job_id});
    this.companyInfosService.updatePositionInfo(option).then(res=>{
      if(res['code'] === 1){
        this.companyInfosService.showMessage('success', '修改成功');
        this.companyInfosService.navTo('/companyAdmin/recruit');
      }else{
        this.companyInfosService.showMessage('error', res['msg']);
      }
    })
  }

}
