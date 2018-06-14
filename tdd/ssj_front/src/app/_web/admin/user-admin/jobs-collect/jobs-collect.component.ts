import { Component, OnInit } from '@angular/core';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-jobs-collect',
  templateUrl: './jobs-collect.component.html',
  styleUrls: ['./jobs-collect.component.css']
})
export class JobsCollectComponent implements OnInit {

  public _isAppliedJobs:Boolean = false;//是否存在申请的职位
  public appliedJobs = []; // 收藏的职位数组

  constructor(
    private userInfoService: UserInfosService
  ) { }

  ngOnInit() {
    this.getCollectJobs();
  }

  getCollectJobs(){
    this.userInfoService.getCollectJobsInfoList().then(res=>{
      if(res['code'] === 1){
        this.appliedJobs = res['data'];
        if(this.appliedJobs.length == 0){
          this._isAppliedJobs = true;
        }
      }else{
        this._isAppliedJobs = true;
      }
    })
  }

  cancelCollect(id, i){
    this.userInfoService.cancelAppiledJob({job_id: id}).then(res=>{
      if(res['code'] === 1){
        this.appliedJobs.splice(i, 1);
        this.userInfoService.showMessage('success', '取消收藏职位！');
        if(this.appliedJobs.length == 0){
          this._isAppliedJobs = true;
        }
      }else{
        this.userInfoService.showMessage('error', '操作失败');
      }
    })
  }
}
