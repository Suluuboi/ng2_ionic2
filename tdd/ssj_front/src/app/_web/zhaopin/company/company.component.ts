import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JobsInfoServiceService } from '../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public companyInfo;
  public isData :boolean = false;
  public isConferenceRoom :boolean = false; // 是否存在会议室
  public src = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private jobsInfoService : JobsInfoServiceService
  ) { }

  ngOnInit() {
    // 获取到路由中单位ID： companyId ，然后查询到该单位信息，显示到主页上。
    this.activatedRoute.params.subscribe( (params: Params) => {
      let _companyId = params['companyId'];
      this.getCompanyInfos(_companyId);
    });
  }

  getCompanyInfos(id){
    this.jobsInfoService.getCompanyInfoPreview({company_id:id}).then(res=>{
      if(res['code'] === 1){
        this.companyInfo = res['data'];
        this.isData = true;
        this.src += this.companyInfo.logo_pic;
        if(this.companyInfo.room_url != ''){
          this.isConferenceRoom = true;
        }else{
          this.isConferenceRoom = false;
        }
        this.jobsInfoService.setLocalStorageItemAnyTime('companyPreviewInfo', res['data'], 1);
      }else{
        this.isData = false;
      }
    })
  }

}
