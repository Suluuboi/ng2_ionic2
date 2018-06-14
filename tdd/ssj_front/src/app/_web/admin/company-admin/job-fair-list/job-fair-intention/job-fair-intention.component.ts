import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { IntentionFormComponent } from './intention-form/intention-form.component';
import { ActivatedRoute } from '@angular/router';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-job-fair-intention',
  templateUrl: './job-fair-intention.component.html',
  styleUrls: ['./job-fair-intention.component.css']
})
export class JobFairIntentionComponent implements OnInit {
  public fair_id;// 招聘会id
  public searchName:string = ''; // 协议查询
  public searchIdcard:string = ''; // 协议查询

  _data = {};
  _dataSet = [];
  _loading = true;

  // 协议导入：文件上传
  public intentionfile = new FormData();
  
  constructor(
    private companyInfoService: CompanyInfosService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.companyInfoService.setTitle('意向性协议-招聘会');
    this.activatedRoute.params.subscribe(params =>{
      this.fair_id = params['id'];
    })
  }

  ngOnInit() {
    this.getIntentionInfoList({fair_id: this.fair_id});
  }
  // 协议查询
  searchTextValueChange() {
    let _option = {
      name: this.searchName,
      id_card: this.searchIdcard
    }
    this.getIntentionInfoList(_option)
  }
  // 模板下载与数据导入
  uploadIntentionFile(){
    let _file = $('#intention')[0].files[0];
    this.intentionfile.append('agreement_file', _file);
    this.intentionfile.append('fair_id', this.fair_id);
    let options = {
      fair_id: this.fair_id,
      agreement_file: $('#intention')[0].files[0]
    }
    this.companyInfoService.uploadIntentions(this.intentionfile).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this.getIntentionInfoList();
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  
  // 获取协议列表
  getIntentionInfoList(opt?){
    let _opt = opt || {};
    _opt['fair_id'] = this.fair_id;
    this.companyInfoService.getIntentionAgreeMents(_opt).then(res=>{
      if(res['code'] === 1){
        this._data = res['data'];
        this._dataSet = this._data['data'];
        this._loading = false;
      }else{
        this.companyInfoService.showMessage('error', '数据获取失败，刷新后重试');
      }
    })
  }
  // 页码变化
  pageChangeClick(value) {
    this.getIntentionInfoList({ page: value });
  }

  // 回访记录
  navToReturnVisited = (id) => {
    this.companyInfoService.navTo('/companyAdmin/intentionReturn/' + id);
  }

  // 删除事件
  cancelDeleted = function () {
    this.companyInfoService.showMessage('info', '取消删除任务');
  };

  deletedData = (i, agreement_id) => {
    this.companyInfoService.deletedIntentionAgreeMents({agreement_id: agreement_id}).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
        this._dataSet.splice(i, 1);
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  };


  // 表单组件弹出框的调用
  showModalForEdit(data?) {
    const subscription = this.modalService.open({
      title          : data? '编辑' : '添加',
      content        : IntentionFormComponent,
      onOk() {
      },
      onCancel() {
        // console.log('Click cancel');
      },
      footer         : false,
      componentParams: {
        info: data? data: '',
        id  : this.fair_id
      }
    });
    subscription.subscribe(result => {
      if(result && result.isEdit){
        this.getIntentionInfoList();
      }
    })
  }
}
