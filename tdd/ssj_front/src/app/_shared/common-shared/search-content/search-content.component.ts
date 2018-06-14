import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css']
})
export class SearchContentComponent implements OnInit {

  public _value: string;
  @Output()
  searchValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  searchFunction(){
    this.updateSearchValue(this._value);
  }
   // 搜素框的键盘事件
  searchValueChange(e){
    if(e.keyCode === 13){
      this.updateSearchValue(this._value);
    }
  }
  updateSearchValue(event: string): void{
    this.searchValue.emit(event);
  }
}
