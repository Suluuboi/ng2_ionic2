import { Component, OnInit } from '@angular/core';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-resumes-viewed',
  templateUrl: './resumes-viewed.component.html',
  styleUrls: ['./resumes-viewed.component.css']
})
export class ResumesViewedComponent implements OnInit {

  public infoList = [];
  public isInfos:Boolean = false;
  constructor(
    private userInfoService : UserInfosService
  ) { }

  ngOnInit() {
    this.getResumeViewedInfos();
  }

  getResumeViewedInfos(){
    this.userInfoService.scanResumeViewedCompanys().then(res=>{
      if(res['code'] === 1 && res['data'].length != 0){
        this.infoList = res['data'];
        this.isInfos = false;
      }else{
        this.isInfos = true;
      }
    })
  }

}
