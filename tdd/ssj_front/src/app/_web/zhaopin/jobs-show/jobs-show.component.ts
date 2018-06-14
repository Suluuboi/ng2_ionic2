import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchOptions } from './../choese-menu/choese-menu.component';
import { JobsInfoServiceService } from '../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'jobs-show',
  templateUrl: './jobs-show.component.html',
  styleUrls: ['./jobs-show.component.css']
})
export class JobsShowComponent implements OnChanges, OnInit {

  dataSet = {};//职位的列表信息：当前页码，总数等待
  jobsInfos = [];
  _loading = true;
  public isNotJobs = false;// 没有职位
  public created_at = '';
  @Input() searchOptions: SearchOptions;
  @Output() setOptionsNull:EventEmitter<any> = new EventEmitter()

  constructor(
    private jobsInfoService: JobsInfoServiceService
  ) { }

  ngOnChanges() {
    this.getJobsInfos(this.searchOptions);
  }

  ngOnInit() {

  }

  getJobsInfos(opt?) {
    let _opt = opt || {};
    this._loading = true;// 显示数据加载动画
    this.jobsInfoService.getJobsInfos(_opt).then(res => {
      if (res['code'] === 1) {
        this._loading = false;
        if(res['data'].constructor !== Array){
          this.dataSet = res['data'];
          this.jobsInfos = this.dataSet['data'];
          this.isNotJobs = false;
        }else{
          this.dataSet = {};
          this.jobsInfos = [];
          this.isNotJobs = true;
        }
      } else {
        this.searchOptions = {
          name: '',
          province_id: null,
          city_id: null,
          district_id: null,
          first_position_id:null,
          second_position_id:null,
          third_position_id:null,
          experience_id: null,
          education_id: null,
          industry_id: null,
          salary_id: 0,// 取默认值
          type_id: 0,
          order: '0'
        };
        this.setOptionsNull.emit(this.searchOptions);
        // this.getJobsInfos();
      }
    });
  }
  // 页码变化
  pageChangeClick(value) {
    this.getJobsInfos({ page: value });
  }
}
