import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-in-recruit',
  templateUrl: './in-recruit.component.html',
  styleUrls: ['./in-recruit.component.css']
})
export class InRecruitComponent implements OnInit {

  public searchConditions: string = '';//查询条件

  public jobList = [];//正在招聘的职位信息
  public dataList: object = {}; //职位列表的所有信息：包含总数，分页，链接等
  _isJobs = false;
  _allChecked = false;//是否全选
  _displayData = []; // 选中的职位数组
  _loading = false; // 显示加载中样式
  _indeterminate = false;

  public isExtended = false; // 延期招聘弹出框
  public isExtendedAll = false; //所有职位延期时间
  public isConfirmLoading = false; // 获取返回值后隐藏

  public extendedDate = null;// 修改过期时间
  public extendedAllDate = null;

  constructor(
    private companyInfoService: CompanyInfosService
  ) { }

  ngOnInit() {
    this.showJobList({});
  }
  // 职位搜索
  searchJobsForName(e) {
    if (e.keyCode === 13) {
      this.showJobList({ name: this.searchConditions });
    }
  }
  // 职位展示
  showJobList(opt) {
    this.companyInfoService.getPositionListInfos(opt).then(res => {
      if (res['code'] === 1) {
        if (res['data'].constructor !== Array) {
          this.dataList = res['data'];
          this.jobList = this.dataList['data'];
          this._displayData = this.dataList['data'];
          this._isJobs = false;
        } else {
          this.dataList = {};
          this.jobList = [];
          this._isJobs = true;
        }
      } else {
        this._isJobs = true;
      }
    })
  }

  // 页码变化
  pageChangeClick(value) {
    this.showJobList({ page: value });
  }

  // 给列表数据添加 checked属性。 判断当前简历是否被选中。
  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  };
  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  };

  _displayDataChange(value) {
    this._displayData = value;
    this._refreshStatus();
  };
  // 暂停招聘职位
  recruitmentFreeze(job_id, i) {
    this.companyInfoService.pausedPosition(job_id).then(res => {
      if (res['code'] === 1) {
        this.jobList[i].pause_text = '已暂停';
        this.companyInfoService.showMessage('success', '当前职位暂停成功');
      } else {
        this.companyInfoService.error({
          title: "暂停失败",
          content: '请刷新页面后重试'
        })
      }
    })
  }
  // 继续招聘
  continueToRecruit(job_id, i) {
    this.companyInfoService.continuePosition(job_id).then(res => {
      if (res['code'] === 1) {
        this.jobList[i].pause_text = '招聘中';
        this.companyInfoService.showMessage('success', '当前职位继续招聘');
      } else {
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }

  // 修改职位
  editJobInfo(job_id) {
    this._loading = true;
    this.companyInfoService.navTo('/companyAdmin/jobEdit/' + job_id);
  }
  // 刷新当前职位
  reloadJobs(job_id, i) {
    this.companyInfoService.refreshPositionInfo(job_id).then(res => {
      if (res['code'] === 1) {
        this.jobList[i].updated_at = res['data'].time;
        this.companyInfoService.showMessage('success', '当前职位刷新成功');
      } else {
        this.companyInfoService.error({
          title: "刷新失败",
          content: '请刷新页面后重试'
        })
      }
    })
  }
  // 批量刷新职位
  reloadChoeseJobs() {
    let _checked = [];
    if (this._displayData.length === 0) {
      this.companyInfoService.showMessage('error', '请选择需要刷新的职位！');
      return;
    }
    this._displayData.forEach(el => {
      if (el.checked === true) {
        _checked.push(el.job_id);
      }
    })
    this.companyInfoService.refreshAllPositionInfo(_checked).then(res => {
      if (res['code'] === 1) {
        this.showJobList({ page: this.dataList['current_page'] });
        this.companyInfoService.showMessage('success', '当前职位刷新成功');
        this._allChecked = false;
      } else {
        this.companyInfoService.error({
          title: "刷新失败",
          content: '请刷新页面后重试'
        })
      }
    })
  }

  // 批量延长招聘
  extendAllJobs() {
    this.isExtendedAll = true;
  }
  // 批量暂停招聘
  pauseAllJobs() {
    let _checked = [];
    this._displayData.forEach(el => {
      if (el.checked === true) {
        _checked.push(el.job_id);
      }
    })
    this.companyInfoService.pausedAllPosition(_checked).then(res => {
      if (res['code'] === 1) {
        this.showJobList({ page: this.dataList['current_page'] });
        this.companyInfoService.showMessage('success', '所选职位暂停成功');
        this._allChecked = false;
      } else {
        this.companyInfoService.showMessage('error', '所选职位暂停失败');
      }
    })
  }

  // 删除该职位
  cancel() {
    this.companyInfoService.showMessage('info', '取消删除任务');
  }

  confirm(job_id, i) {
    this.companyInfoService.deletedPositionInfo(job_id).then(res => {
      if (res['code'] === 1) {
        this.showJobList({ page: this.dataList['current_page'] });
        this.companyInfoService.showMessage('success', '所选职位删除成功');
        this._allChecked = false;
      } else {
        this.companyInfoService.showMessage('error', '所选职位删除失败');
      }
    })
  }

  // 单个职位延期操作。
  public currentJobs_id;// 当前延期职位id
  showModal = (value) => {
    this.isExtended = true;
    this.currentJobs_id = value;
  }
  extendedOk = (e) => {
    this.isConfirmLoading = true;
    let d = new Date(this.extendedDate);

    let opt = {
      job_id: this.currentJobs_id,
      delay_time: this.dealDateWith(d)
    }
    this.companyInfoService.extendedPosition(opt).then(res => {
      this.isConfirmLoading = false;
      this.isExtended = false;
      if (res['code'] === 1) {
        this.showJobList({ page: this.dataList['current_page'] });
        this.companyInfoService.showMessage('success', '当前职位延期成功');
      } else {
        this.companyInfoService.error({
          title: "延期失败",
          content: '请刷新页面后重试'
        })
      }
    })
  }
  extendedCancel = (e) => {
    this.isExtended = false;
  }
  // 多选职位延期成功与否的操作。
  extendedAllOk = (e) => {
    let _checked = [];
    this._displayData.forEach(el => {
      if (el.checked === true) {
        _checked.push(el.job_id);
      }
    })
    let d = new Date(this.extendedAllDate);
    let opt = {
      job_id: _checked,
      delay_time: this.dealDateWith(d)
    }
    this.companyInfoService.extendedAllPositionInfo(opt).then(res => {
      this.isExtendedAll = false;
      if (res['code'] === 1) {
        this.showJobList({ page: this.dataList['current_page'] });
        this.companyInfoService.showMessage('success', '所选职位延期成功');
      } else {
        this.companyInfoService.error({
          title: "延期失败",
          content: '请刷新页面后重试'
        })
      }
    })
  }
  extendedAllCancel = (e) => {
    this.isExtendedAll = false;
  }

  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }
  // 日期禁用项
  _disabledDate = function (current) {
    return current && current.getTime() < Date.now();
  };

}
