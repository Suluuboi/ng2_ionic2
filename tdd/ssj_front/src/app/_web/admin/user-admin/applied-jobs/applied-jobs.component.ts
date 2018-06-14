import { Component, OnInit } from '@angular/core';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  public resumeStatus: string = 'all';//简历状态  默认为全部
  public resumeDate: string = 'all'; //简历投递时间
  public _isAppliedJobs = false;// 搜索到的人才列表是否为空
  public _loading = true; // 显示加载中样式
  public dataList: object = {}; //职位列表的所有信息：包含总数，分页，链接等
  public jobsInfos = [];

  public options = new Object({
    status: '',
    date: ''
  })

  constructor(
    private userInfosService: UserInfosService
  ) { }

  ngOnInit() {
    this.getAppliedJobsList();
  }

  statusChange(value) {
    if (value === 'all') {
      this.options['status'] = '';
    } else {
      this.options['status'] = value;
    }
    this.getAppliedJobsList(this.options);
  }
  dateChange(value) {
    if (value === 'all') {
      this.options['date'] = '';
    } else {
      this.options['date'] = value;
    }
    this.getAppliedJobsList(this.options);
  }

  // 页码变化
  pageChangeClick(value) {
    this.options['page'] = value;
    this.getAppliedJobsList(this.options);
  }

  getAppliedJobsList(opt?) {
    this.userInfosService.searchAppliedJobsInfoList(opt).then(res => {
      this._loading = false;
      if (res['code'] === 1) {
        if(res['data'].constructor !== Array){
          this.dataList = res['data'];
          this.jobsInfos = this.dataList['data'];
          this._isAppliedJobs = false;
        }else{
          this.dataList = {};
          this.jobsInfos = [];
          this._isAppliedJobs = true;
        }
      } else {
        this._isAppliedJobs = false;
      }
    })
  }
}
