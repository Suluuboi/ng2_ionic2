import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../_core/service/_user-service/login.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public userInfo;
  public isLogin: Boolean = false;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getCurrentUserInfos();
  }
  getCurrentUserInfos(){
    this.loginService.getUserInfos().then(res=>{
      if(res['code'] === 1){
        if(res['data']){
          this.isLogin = true;
          this.userInfo = res['data'];
        }else{
          this.isLogin = false;
        }
      }else{
        this.isLogin = false;
      }
    })
  }

  loginOut(){
    this.loginService.loginOut().then( res => {
      if(res['code'] == 1){
        this.loginService.navTo('/index');
      }else{
        return false;
      }
    });
  }
}
