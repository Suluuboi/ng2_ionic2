import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../../_core/service/_user-service/login.service';
import { LocalStorageService } from '../../../../../_core/service/_config-service/local-storage.service';
import { LoginComponent } from '../../../login/login.component';
import { WebNavBarSider } from '../../../../../menu_config/web-navbar-sider.config';

@Component({
  selector: 'header-top',
  templateUrl: './head-top.component.html',
  styleUrls: ['./head-top.component.css']
})
export class HeadTopComponent implements OnInit {

  public _islogin:Boolean = false;
  public _userName = '';
  public currentInfo;//判断是否为登录状态，然后将登录状态下的用户信息存储

  public menuList:any[] = [];// 导航菜单列表
  constructor(
    private modalService: NzModalService,
    private loginService: LoginService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.getCurrentUserInfos();
    this.menuList = WebNavBarSider;
  }

  getCurrentUserInfos(){
    this.loginService.getUserInfos().then(res=>{
      if(res['code'] === 1){
        if(res['data']){
          this._islogin = true;
          this.currentInfo = res['data'];
        }else{
          this._islogin = false;
        }
      }else{
        this._islogin = false;
      }
    })
  }

  showModalForLoginComponent() {
    const subscription = this.modalService.open({
      title          : '',
      content        : LoginComponent,
      wrapClassName  : 'modal-center-box',
      footer         : false,
      width          : 425,
      onOk() {
      },
      onCancel() {
      },
      componentParams: {
        name: '首页登录框'
      }
    });
    // subscription.subscribe(result => {
    // })
  }
  navToUserCenter(){
    if(this.currentInfo.type == 'company'){
      this.loginService.navTo('/companyAdmin');
    }else if(this.currentInfo.type  == 'person'){
      this.loginService.navTo('/userAdmin');
    }else{
      this.loginService.navTo('/index');
    }
  }
  // 退出登录
  loginOut(){
    this.loginService.loginOut();
    this._islogin = !this._islogin;
  }

  showModalForRegistComponent(){
      this.loginService.navTo('/register');
  }

  toggleMenu(){
    console.log('toggleMenu');
    
  }

}
