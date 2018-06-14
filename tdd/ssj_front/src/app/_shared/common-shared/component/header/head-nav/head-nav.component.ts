import { Component, OnInit, Input } from '@angular/core';
import { WebNavBarSider } from '../../../../../menu_config/web-navbar-sider.config';

@Component({
  selector: 'header-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.css']
})
export class HeadNavComponent implements OnInit {
  public menuList = [];
  constructor() {
    this.menuList = WebNavBarSider;
  }

  ngOnInit() { }

}
