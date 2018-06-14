import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup-project',
  templateUrl: './startup-project.component.html',
  styleUrls: ['./startup-project.component.css']
})
export class StartupProjectComponent implements OnInit {
  radioValue = 'A';
  radioValue1 = '1';
  radioValue2 = '5';
  radioValue3 = '10';

  constructor() { }

  ngOnInit() {
  }

  industrySelectChange(value){
    console.log(value);
  }
}
