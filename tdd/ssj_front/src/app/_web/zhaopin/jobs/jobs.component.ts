import { SearchOptions } from './../choese-menu/choese-menu.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-search-menu',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsListShowComponent implements OnInit {

  public isNull :boolean = false;
  public options:SearchOptions;
  constructor(
  ) { }

  ngOnInit() {
    
  }
  getSearchOptions(option){
    this.options = Object.assign({}, option);
  }
  setOptionsNull($event){
    this.isNull = true;
  }
}
