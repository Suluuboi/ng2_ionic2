import { Component, OnInit } from '@angular/core';
import { IndexService } from '../_index-service/index.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: IndexService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('天府新区公共就业服务网');
  }
}
