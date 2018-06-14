import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-show',
  templateUrl: './user-info-show.component.html',
  styleUrls: ['./user-info-show.component.css']
})
export class UserInfoShowComponent implements OnChanges, OnInit {
  public userInfo;// 个人信息

  @Input()
  userinfo;


  constructor(
    private route: Router
  ) { }

  ngOnChanges() {
    this.getUserInfoMsg();
  }

  ngOnInit() {

  }

  getUserInfoMsg() {
    if (this.userinfo) {
      this.userInfo = this.userinfo;
    } else {
      this.navToUserInfo();
    }
  }

  navToUserInfo() {
    this.route.navigateByUrl("/userAdmin/userInfo");
  }

}
