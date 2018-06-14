import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.css']
})
export class CompanyAdminComponent implements OnInit {
  public _body = document.getElementsByTagName('body')[0];
  constructor() { }

  ngOnInit() {
    this._body.style.removeProperty('overflow');
  }

}
