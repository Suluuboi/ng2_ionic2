import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ChangePwdService } from '../../../../_core/service/_user-service/change-pwd.service';

@Component({
  selector: 'app-pwd-manager',
  templateUrl: './pwd-manager.component.html',
  styleUrls: ['./pwd-manager.component.css']
})
export class PwdManagerComponent implements OnInit {

  public errorText: string = '';
  constructor(
    private changePwdService: ChangePwdService,
    private confirmServ: NzModalService
  ) { }

  ngOnInit() {
  }

  getChangePassword(value) {
    this.changePwdService.changePassword(value).then(res => {
      if (res['code'] == 1) {
        this.success();
      } else {
        this.errorText = res['msg'];
        this.error();
      }
    })
  }

  success() {
    this.confirmServ.success({
      title: '密码修改成功',
      content: '请重新登录',
      onOk: () => {
        this.changePwdService.navgateTo('/login');
      }
    });
  }

  error() {
    this.confirmServ.error({
      title: '修改密码失败',
      content: this.errorText
    });
  }

}
