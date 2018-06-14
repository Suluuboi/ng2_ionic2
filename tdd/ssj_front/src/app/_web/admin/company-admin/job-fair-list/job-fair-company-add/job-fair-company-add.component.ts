import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-fair-company-add',
  templateUrl: './job-fair-company-add.component.html',
  styleUrls: ['./job-fair-company-add.component.css']
})
export class JobFairCompanyAddComponent implements OnInit {
  public jobfair_id: string;
  public company_id: string;
  public searchText: string; // SEARCH  text
  public searchArray: Array<any> = []; // 查询结果
  public companys: Array<any> = [];// company list
  public jobs: Array<any> = []; // company's jobs item

  // right: company's jobs list
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _indeterminate = false;

  constructor(
    private companyInfoService: CompanyInfosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.jobfair_id = params['jobfair_id'];
    });
  }
  ngOnInit() {
    this.getJobfairCompanyList(); // 获取公司列表  作为tabs
  }

  _operateData() {
    this._operating = true;
    let _jobs_id = [];// select  jobs  id
    this._displayData.forEach(data => {
      if (data.checked) {
        _jobs_id.push({
          id: data.id,
          name: data.name
        });
      }
    });
    let opt = {
      fair_id: this.jobfair_id,
      company_id: this.company_id,
      jobs: _jobs_id
    }
    this.companyInfoService.addJobsToJobfair(opt).then(res => {
      if (res['code'] === 1) {
        this._operating = false;
        this.companyInfoService.showMessage('success', res['msg']);
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }

  // search input event
  onSearch(value: string): void {
    if (value == '' || value.trim() == '') {
      this.companyInfoService.showMessage('error', '搜索内容不能为空');
      return;
    }
    this.searchText = value.trim();
    this.companyInfoService.searchCompanyToAdd({ name: this.searchText }).then(res => {
      if (res['code'] === 1) {
        if (res['data'].length !== 0) {
          $("#search-content").show();
          this.searchArray = res['data'];
          $("#search").mouseleave(() => {
            $("#search-content").hide();
          })
        } else {
          this.companyInfoService.showMessage('success', res['msg']);
        }
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  // get company list
  getJobfairCompanyList() {
    let opt = { fair_id: this.jobfair_id };
    this.companyInfoService.getJobfairsCompanyList(opt).then(res => {
      if (res['code'] === 1) {
        this.companys = res['data'];
        if (this.companys.length != 0) {
          this.showCompanyJobslist(this.companys[0]['pivot']['company_id']);
        }
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  //  add company to jobfair list
  addCompanyToJobfair(companyId) {
    let opt = {
      fair_id: this.jobfair_id,
      company_id: companyId,
      type: 'add'
    }
    this.companyInfoService.addCompanyToJobfair(opt).then(res => {
      if (res['code'] === 1) {
        this.companyInfoService.showMessage('success', res['msg']);
        this.getJobfairCompanyList();
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  //  delete company to jobfair list
  deleteCompanyToJobfair(companyId) {
    let opt = {
      fair_id: this.jobfair_id,
      company_id: companyId,
      type: 'del'
    }
    this.companyInfoService.deleteCompanyToJobfair(opt).then(res => {
      if (res['code'] === 1) {
        this.companyInfoService.showMessage('success', res['msg']);
        this.getJobfairCompanyList();
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  // show Company jobs
  showCompanyJobslist(companyId) {
    this.company_id = companyId;
    let opt = {
      fair_id: this.jobfair_id,
      company_id: companyId
    }
    this.companyInfoService.getCompanyJobsList(opt).then(res => {
      if (res['code'] === 1) {
        this.jobs = res['data'];
        this.jobs.forEach(data => {
          if (data.type === 0) {
            data.checked = false;
          } else {
            data.checked = true;
          }
        });
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }

  cancel() {
    console.log('click cancel!');
  }
  // checkbox events
  _displayDataChange($event) {
    this._displayData = $event;
  }
  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this.jobs.some(value => value.checked);
    this._checkedNumber = this.jobs.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }
}
