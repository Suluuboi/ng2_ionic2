import { Component, OnInit } from '@angular/core';
import { LawsInfoService } from '../laws-service/laws.service';

@Component({
  selector: 'app-laws-list',
  templateUrl: './laws-list.component.html',
  styleUrls: ['./laws-list.component.css']
})
export class LawsListComponent implements OnInit {
  public option = {
    keyword: '',
    page: null
  };
  public pagiNation;
  public laws:Array<any> = [];

  public isNull:boolean = false;
  constructor(
    private lawsInfoService: LawsInfoService
  ) { }

  ngOnInit() {
    this.getLawsInfoList();
  }

  // get laws info list 
  getLawsInfoList(){
    this.lawsInfoService.getLawsList(this.option).then(res=>{
      if(res['code'] === 1){
        if(res['data'].constructor !== Array){
          this.pagiNation = res['data'];
          this.laws = this.pagiNation['data'];
          if(this.laws.length != 0){
            this.isNull = false;
          }else{this.isNull = true;}
        }else{
          this.laws = [];
          this.pagiNation = {};
          this.isNull = true;
        }
      }else{
        this.laws = [];
        this.isNull = true;
      }
    })
  }

  // get search input component value
  getSearchValue(value){
    this.option = {
      keyword: value,
      page: null
    }
    this.getLawsInfoList();
  }

  pageIndexChange(value){
    this.option['page'] = value;
    this.getLawsInfoList();
  }
}