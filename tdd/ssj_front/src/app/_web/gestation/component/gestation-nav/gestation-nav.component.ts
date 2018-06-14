import { Component, OnInit } from '@angular/core';

const MENU = [
  { navUrl: '/gestation/home', navTitle: '首页'},
  { navUrl: '/gestation/startup-project', navTitle: '创业项目'},
  { navUrl: '/gestation/mentors', navTitle: '创业导师'},
  { navUrl: '/gestation/incubation-base', navTitle: '孵化基地'},
  // { navUrl: '', navTitle: '培训机构'}
]
@Component({
  selector: 'app-gestation-nav',
  templateUrl: './gestation-nav.component.html',
  styleUrls: ['./gestation-nav.component.css']
})
export class GestationNavComponent implements OnInit {
  public navList:any[] = MENU;
  single = '';
  _value = '';
  options = [
    { value: 'jack', label: '创业项目' },
    { value: 'lucy', label: '创业导师' },
    { value: 'lucy', label: '孵化基地' },
    { value: 'lucy', label: '培训机构' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
