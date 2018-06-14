import { Component, OnInit } from '@angular/core';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-fair-add',
  templateUrl: './job-fair-add.component.html',
  styleUrls: ['./job-fair-add.component.css']
})
export class JobFairAddComponent implements OnInit {
  public jobFairManage = 'createJobFair';
  constructor(
    private companyInfoService: CompanyInfosService
  ) { }

  ngOnInit() {
  }

  getJobFairInfos(value){
    this.companyInfoService.createJobfairInCompanyAdmin(value).then(res=>{
      if(res['code'] == 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this.companyInfoService.success({
          title: '创建成功',
          content: '是否继续创建招聘会',
          okText: '是',
          ok: () =>{
            this.companyInfoService.navTo('/companyAdmin/jobFairAdd');
          },
          cancelText: '否',
          cancel: ()=>{
            this.companyInfoService.navTo('/companyAdmin/jobFair');
          }
        })
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
}
