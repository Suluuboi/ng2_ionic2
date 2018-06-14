import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ReturnVisitFormComponent } from './return-visit-form/return-visit-form.component';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-jobfair-return-visit',
  templateUrl: './jobfair-return-visit.component.html',
  styleUrls: ['./jobfair-return-visit.component.css']
})
export class JobfairReturnVisitComponent implements OnInit {

  public agreement_id:string; // 用户id
  public user_name:string; // name
  public user_phone:string; // phone
  public user_idcard: string; // id_card

  _dataSet = [];
  _data = {};
  _loading = true;
  constructor(
    private companyInfoService: CompanyInfosService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params =>{
      this.agreement_id = params['id'];
      this.user_name  = params['name']; // name
      this.user_phone  = params['phone']; // phone
      this.user_idcard  = params['idcard']; // id_card
    })
  }

  ngOnInit() {
    this.getIntentionVisitReturnInfoList();
  }

  // 获取数据。
  getIntentionVisitReturnInfoList(opt?){
    let _opt = opt || {};
    _opt['agreement_id'] = this.agreement_id;
    this.companyInfoService.getIntentionVisitReturn(_opt).then(res=>{
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
    this.getIntentionVisitReturnInfoList({ page: value });
  }

  // 表单组件弹出框的调用
  showModalForEdit(data?) {
    const subscription = this.modalService.open({
      title          : data? '编辑' : '添加',
      content        : ReturnVisitFormComponent,
      onOk() {
      },
      onCancel() {
        console.log('取消添加协议！');
      },
      footer         : false,
      componentParams: {
        info: data? data: '',
        id  : this.agreement_id
      }
    });
    subscription.subscribe(result => {
      if(result && result.isEdit){
        this.getIntentionVisitReturnInfoList();
      }
    })
  }
  // 删除事件
  cancelDeleted = function () {
    this.companyInfoService.showMessage('info', '取消删除任务');
  };

  deletedData = (i, visit_id) => {
    this.companyInfoService.deletedIntentionVisitReturn({visit_id: visit_id}).then(res=>{
      if(res['code'] === 1){
        this._dataSet.splice(i, 1);
        this.companyInfoService.showMessage('success', res['msg']);
        this.getIntentionVisitReturnInfoList();
      }else{
        this.companyInfoService.showMessage('error', '删除记录失败，请刷新后重试！');
      }
    })
  };
}
