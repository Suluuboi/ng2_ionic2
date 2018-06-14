import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {
  radioValue = 'A';
  radioValue1 = '1';
  radioValue2 = '5';
 
  constructor() { }

  ngOnInit() {
  }

  
  industrySelectChange(value){
    console.log(value);
  }
}
