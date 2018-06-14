import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConferenceRoomFormComponent } from './conference-room-form/conference-room-form.component';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.css']
})
export class ConferenceRoomComponent implements OnInit {

  public addOptions = {
    room_name: '',
    password : '',
    max_count: ''
  };
  public conferenceInfo = [];
  public isConferenceRoom:boolean = false;
  public isAddConferenceRoom:boolean = false;

  constructor(
    private modalService: NzModalService,
    private companyInfoService : CompanyInfosService
  ) { }

  ngOnInit() {
    this.getConferenceRoomInfo();
  }

  getConferenceRoomInfo(){
    this.companyInfoService.getConferenceRoomList().then(res=>{
      if(res['code'] === 1){
        this.conferenceInfo = res['data'];
        if(this.conferenceInfo['length'] != 0){
          this.isConferenceRoom = true;
          this.isAddConferenceRoom = false;
        }else{
          this.isConferenceRoom = false;
          this.isAddConferenceRoom = true;
        }
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }

  addConferenceRoom(){
    const subscription = this.modalService.open({
      title          : '创建会议室',
      content        : ConferenceRoomFormComponent,
      onOk() {
        console.log('Click Ok');
      },
      okText: '添加',
      cancelText: '取消',
      onCancel() {
        // console.log('Click cancel');
      },
      footer         : false,
      componentParams: {
        //  参数的传递
        name: '测试渲染Component'
      }
    });
    subscription.subscribe(result => {
      // 接收子组件传递上来的值
      if(result && result.isEdit){
        this.addOptions = result.value;
        this.companyInfoService.addConferenceRoom(this.addOptions).then(res=>{
          if(res['code'] === 1){
            this.companyInfoService.showMessage('success', res['msg']);
            this.getConferenceRoomInfo();
          }else{
            this.companyInfoService.showMessage('error', res['msg']);
          }
        })
      }
    })
  }
  // deleted conference room
  deletedConferenceRoom = () => {
    this.companyInfoService.deletedConferenceRoomList().then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('info', res['msg']);
        this.getConferenceRoomInfo();
      }else{
        this.companyInfoService.showMessage('info', res['msg']);
      }
    })
  }

  // clean conference room
  cleanConferenceRoom = () =>{
    this.companyInfoService.cleanConferenceRoomList().then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('info', res['msg']);
        this.getConferenceRoomInfo();
      }else{
        this.companyInfoService.showMessage('info', res['msg']);
      }
    })
  }

  cancel = function (msg) {
    this.companyInfoService.showMessage('info', msg);
  };

}
