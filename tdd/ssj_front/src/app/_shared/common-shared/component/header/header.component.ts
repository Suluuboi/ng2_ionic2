import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public phoneNumber:string = '028-80510871';

  constructor() { }

  ngOnInit() {
  }

}
