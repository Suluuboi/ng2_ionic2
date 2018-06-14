import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

export class SearchOptions {
  job_id: number;
  start_time: string;
  end_time: string;
  name: string;
  tag: string;
  page: number;
}

@Component({
  selector: 'app-resume-manage',
  templateUrl: './resume-manage.component.html',
  styleUrls: ['./resume-manage.component.css']
})
export class ResumeManageComponent implements OnInit {
  public resumeStatus = [{ label: '不限', value: '0' }, { label: '未查看', value: 'new' }, { label: '已查看', value: 'viewed' }, { label: '待沟通', value: 'awaiting_communicate' }, { label: '邀请面试', value: 'interviewed' }, { label: '不合适', value: 'refused' }];
  public finaceRadioValue = '0';// 默认简历状态选中值// 分页数据
  public job_id = 0; // 默认选中的职位名称
  public positionInfos = []; // 职位数组
  public seekersForm: FormGroup;
  public workAddress: any;
  public dataList: object = {}; //简历列表的所有信息：包含总数，分页，链接等
  public resumeInfos = [];// 简历列表
  public isResumes: Boolean = false; // 是否有简历
  _allChecked = false;//是否全选
  _displayData = []; // 选中的职位数组
  _loading = false; // 显示加载中样式
  _indeterminate = false;
  // 搜索返回数据
  public searchOptions: SearchOptions = {
    job_id: null,
    start_time: '',
    end_time: '',
    name: '',
    tag: '',
    page: null
  };
  constructor(
    private fb: FormBuilder,
    private compoanyInfoService: CompanyInfosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      for (let attr in params) {
        this.searchOptions[attr] = params[attr];
        if (attr == 'tag') {
          this.finaceRadioValue = params['tag'];
        } else if (attr == 'job_id') {
          this.job_id = params['job_id'];
        }
      }
    })
  }

  ngOnInit() {
    // 获取当前职位列表，以便于筛选对应的简历
    this.getPositionListInfo();
    // 获取简历列表
    this.getReusmesInfoList(this.searchOptions);
    this.seekersForm = this.fb.group({
      job_id: [Number(this.job_id)],//姓名搜索
      name: [null],//职位名称
    });
  }
  // 表单提交  submit
  searchSeekers() {
    // 表单提交
    for (const i in this.seekersForm.controls) {
      this.seekersForm.controls[i].markAsDirty();
    }
    let _formValue = this.seekersForm.value;
    this.searchOptions = Object.assign(this.searchOptions, this.seekersForm.value);
    if (this.seekersForm.value.job_id == 0) {
      this.searchOptions.job_id = null;
    }
    this.getReusmesInfoList(this.searchOptions);
  }
  // 获取简历列表
  getReusmesInfoList(opt?) {
    if (this.searchOptions.job_id == 0) {
      this.searchOptions.job_id = null;
    }
    this.compoanyInfoService.getRecivedResumesInfoList(opt).then(res => {
      if (res['code'] === 1) {
        if (res['data'].constructor !== Array) {
          this.dataList = res['data'];
          this.resumeInfos = this.dataList['data'];
          this._displayData = this.dataList['data'];
          this.isResumes = false;
        } else {
          this.dataList = {};
          this.resumeInfos = [];
          this.isResumes = true;
        }
      } else {
        this.isResumes = false;
      }
    })
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
  // 页码变化
  pageChangeClick(value) {
    this.searchOptions['page'] = value;
    this.getReusmesInfoList(this.searchOptions);
  }

  // 验证以及默认阻止等事件方法
  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.seekersForm.controls[name];
  }

  // 工作地点
  getJobWorkAddress(value) {
    this.seekersForm.value.workAddress = value;
    this.workAddress = value;
  }

  //************************** 简历列表管理

  // hide part
  // 简历状态选择
  stateChange(value) {
    if (value == 0) {
      this.searchOptions['tag'] = '';
    } else {
      this.searchOptions['tag'] = value;
    }
    this.getReusmesInfoList(this.searchOptions);
  }
  //简历操作
  // 查看简历
  _viewed(id, _i) {
    this.compoanyInfoService.changeResumeStatusViewed({ user_job_id: id }).then(res => {
      if (res['code'] === 1) {
        this.resumeInfos[_i].status = 'viewed';
        this.compoanyInfoService.showMessage('success', '操作成功！');
      } else {
        this.compoanyInfoService.showMessage('error', '操作失败！');
      }
    })
  }
  _communicate(id, _i) {
    this.compoanyInfoService.changeResumeStatusCommunication({ user_job_id: id }).then(res => {
      if (res['code'] === 1) {
        this.resumeInfos[_i].status = 'awaiting_communicate';
        this.compoanyInfoService.showMessage('success', '操作成功！');
      } else {
        this.compoanyInfoService.showMessage('error', '操作失败！');
      }
    })
  }
  // 邀请面试
  _inviteView(id, _i) {
    this.compoanyInfoService.changeResumeStatusInterview({ user_job_id: id }).then(res => {
      if (res['code'] === 1) {
        this.resumeInfos[_i].status = 'interviewed';
        this.compoanyInfoService.showMessage('success', '操作成功！');
      } else {
        this.compoanyInfoService.showMessage('error', '操作失败！');
      }
    })
  }
  // 拒绝面试
  _reject(id, _i) {
    this.compoanyInfoService.changeResumeStatusRefuse({ user_job_id: id }).then(res => {
      if (res['code'] === 1) {
        this.resumeInfos[_i].status = 'refused';
        this.compoanyInfoService.showMessage('success', '操作成功！');
      } else {
        this.compoanyInfoService.showMessage('error', '操作失败！');
      }
    })
  }
  _delResume(id, _i) {
    this.compoanyInfoService.deletedRecivedResume({ user_job_id: id }).then(res => {
      if (res['code'] === 1) {
        this.resumeInfos.splice(_i, 1);
        this.compoanyInfoService.showMessage('success', '删除成功');
      } else {
        this.compoanyInfoService.error({
          title: '删除失败',
          content: res['msg']
        })
      }
    })
  }
  // 删除简历
  cancelDelete() {
    this.compoanyInfoService.showMessage('info', '取消删除任务!');
  }
  confirmDelete(id, i) {
    this._delResume(id, i);
  }
  // 批量下载 导出简历 （excel格式）
  _allDownload() {
    let arr = this.dealAnyResumes(this._displayData);
    let str = arr.join(",");
    let _url = '/api/company/resume/export?str=' + str;
    window.open(_url);
  }
  // 批量删除
  _allDelete(array) {
    this.compoanyInfoService.deletedAnyRecivedResume({ user_job_id: array }).then(res => {
      if (res['code'] === 1) {
        this.compoanyInfoService.showMessage('success', '删除成功');
        this.getReusmesInfoList();
      } else {
        this.compoanyInfoService.error({
          title: '删除失败',
          content: res['msg']
        })
      }
    })
  }
  cancelAllDelete() {
    this.compoanyInfoService.showMessage('info', '取消删除任务!');
  }
  confirmAllDelete() {
    let arr = this.dealAnyResumes(this._displayData);
    if (arr.length == 0) {
      this.compoanyInfoService.error({
        title: '操作失败',
        content: '简历选择不能为空!'
      });
      return false;
    }
    this._allDelete(arr);
  }
  // hide part
  // 获取当前单位所有再招职位列表
  getPositionListInfo() {
    this.compoanyInfoService.getAllPositionList().then(res => {
      if (res['code'] === 1) {
        this.positionInfos = res['data'];
      }
    })
  }
  // 获取子组件的 起始时间
  getPeriodTime(value) {
    let _start = new Date(value._startDate);
    let _end = new Date(value._endDate);
    this.searchOptions['start_time'] = this.dealDateWith(_start);
    this.searchOptions['end_time'] = this.dealDateWith(_end);
  }


  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
  }
  // 处理多个简历时，将对于的简历id数组返回
  dealAnyResumes(array) {
    let _checked = [];
    array.forEach(el => {
      el.checked === true;
      if (el.checked === true) {
        _checked.push(el.id);
      }
    })
    return _checked;
  }
}