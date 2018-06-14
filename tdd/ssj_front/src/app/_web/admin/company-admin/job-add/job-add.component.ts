import { Component, OnInit } from '@angular/core';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  public editJobInfo = false;
  constructor(
    private companyInfoServce : CompanyInfosService
  ) { }
  
  ngOnInit() {

  }

  getFormValue(value){
    this.companyInfoServce.addPositionInfos(value).then(res=>{
      if(res['code'] === 1){
        this.companyInfoServce.success({
          title: "职位添加成功",
          content: '是否继续发布职位？',
          okText: '是',
          ok: ()=>{
            this.companyInfoServce.navTo('/companyAdmin/jobadd');
          },
          cancelText: '否',
          cancel: ()=>{
            this.companyInfoServce.navTo('/companyAdmin/recruit')
          }
        })
      }
    })
  }
}
