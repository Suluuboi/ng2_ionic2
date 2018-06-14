import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CompanyAdminSider } from '../../../menu_config/company-admin-sider.config';
import { PersonAdminSider } from '../../../menu_config/user-admin-sider.config';

@Component({
  selector: 'app-admin-sider',
  templateUrl: './admin-sider.component.html',
  styleUrls: ['./admin-sider.component.css']
})
export class AdminSiderComponent implements OnChanges, OnInit {
  @Input() type: string;
  public siderList = [];

  constructor() {
  }

  ngOnChanges(){
    if(this.type === 'company'){
      this.siderList = CompanyAdminSider;
    }else if(this.type === 'person'){
      this.siderList = PersonAdminSider;
    }
  }

  ngOnInit() {
       
  }
}
