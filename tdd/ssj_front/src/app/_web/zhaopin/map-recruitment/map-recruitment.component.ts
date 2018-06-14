import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AmapPolylineDirective } from 'ngx-amap';
import { JobsInfoServiceService } from '../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'app-map-recruitment',
  templateUrl: './map-recruitment.component.html',
  styleUrls: ['./map-recruitment.component.css']
})
export class MapRecruitmentComponent implements OnInit {

  public searchType: string = 'company'; // 搜索类型
  public searchContent: string = ''; // 搜索内容名称
  public placeholder: string = '请输入' + (this.searchType == 'company' ? '公司' : '职位') + '名称';
  public _center = [104.065746, 30.657459];
  public companys = [];
  public open = true;
  public options = {
    type: 'company',
    keyword: '',
    min_lng: null,
    max_lng: null,
    min_lat: null,
    max_lat: null
  };

  // 弹出信息窗口定位
  infoWindowOffset = {
    x: 0,
    y: -30
  };
  public map: any;// 存储地图对象
  constructor(
    private confirmServ: NzModalService,
    private jobsInfoService: JobsInfoServiceService
  ) { }

  ngOnInit() {

  }
  // 发起请求获取数据
  getJobsInfo(opt) {
    this.jobsInfoService.getJobsBasedOnMap(opt).then(res => {
      if (res['code'] === 1) {
        if (res['data'].length != 0) {
          this.companys = res['data'];
        } else {
          this.confirmServ.warning({
            title: '',
            content:'该区域没有职位'
          })
        }
      }
    })
  }

  keywordsChange(e) {
    if (e.keyCode === 13) {
      this.options.keyword = this.searchContent;
      this.getJobsInfo(this.options);
    }
  }
  searchClick() {
    this.options.keyword = this.searchContent;
    this.getJobsInfo(this.options);
  }
  selectChange(value) {
    this.placeholder = '请输入' + (this.searchType == 'company' ? '公司' : '职位') + '名称';
    this.options.type = this.searchType;
  }
  onMapReady(e) {
    this.map = e;
    this.getPositionLng(this.map);                                    
  }
  // 地图拖拽（鼠标移动时）
  mouseUpEvent(e) {
    this.getPositionLng(e.target);
  }
  // 地图比例变化时
  zoomChange(){
    this.getPositionLng(this.map);
  }
  onMarkerClick(e) {
  }
  getPositionLng(map){
    let l = map.getBounds();
    this.options.max_lng = l.northeast.lng;
    this.options.min_lng = l.southwest.lng;
    this.options.max_lat = l.northeast.lat;
    this.options.min_lat = l.southwest.lat;
    this.getJobsInfo(this.options);
  }
}
