import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ZphService } from '../../_zhaopin-service/web-zph.service';

@Component({
  selector: 'app-zph-detail',
  templateUrl: './zph-detail.component.html',
  styleUrls: ['./zph-detail.component.css']
})
export class ZphDetailComponent implements OnInit {
  public fair_id: number; //招聘会id
  public dataSet = {
    id: '',
    title: '',
    address: '',
    applicant_type: '',
    job_type: '',
    proposer: '',
    start_time: '',
    end_time: '',
    status: ''
  }; // 招聘会介绍信息
  public companys = [];// 招聘会参会单位

  constructor(
    private activatedRoute: ActivatedRoute,
    private zphService: ZphService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.fair_id = params['id'];
      this.zphService.getJobFairDetailsInfo({ fair_id: this.fair_id }).then(res => {
        if (res['code'] === 1) {
          let _infos = res['data'];
          this.companys = _infos['jobs'];
          this.dataSet  = _infos['info'];
          this.zphService.setTitle(this.dataSet['title'] + '-' + this.dataSet['address'] + '-招聘会详情');
        }
      })
    })
  }

}
