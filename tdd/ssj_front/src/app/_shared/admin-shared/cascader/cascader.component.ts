import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ConfigInfoService } from '../../../_core/service/_config-service/config-info.service';
import { LocalStorageService } from '../../../_core/service/_config-service/local-storage.service';

@Component({
  selector: 'cascader',
  template: `
  <nz-cascader
    [(ngModel)]="DefaultValue"
    (nzChange)="valueChange($event)"
    [nzPlaceHolder]="'请选择城市'"
    (nzLoad)="loadData($event)">
  </nz-cascader>`,
  styles: [`
    .ant-cascader-menu{height: auto!important;}
  `]
})
export class CascaderComponent implements OnChanges, OnInit {

  public provinces;//省级城市名称
  public cities;  // 市级城市名称
  public district; // 区县名称
  @Output('companyLocation')
  locationAddress: EventEmitter<any> = new EventEmitter();
  // 省市级联
  @Input()
  DefaultValue: any[];
  // _value: any[] = [
  //   {value: "北京", label: "北京"},
  //   {value: "北京", label: "北京"}
  // ];
  // _value =  ["内蒙古", "包头", "昆都伦区"];

  @Input()
  userType: string; // 判断当前调用该级联组件的是个人用户还是 单位用户

  public _isleaf:boolean = false;

  constructor(
    private configInfoService: ConfigInfoService,
    private localStorage: LocalStorageService
  ) { }

  ngOnChanges(){
    this._isleaf = this.userType === 'user' ? true : false;
  }

  ngOnInit() {
    if(this.localStorage.getItem('area')){
      this.provinces = this.localStorage.getItem('area');
    }else{
      this.configInfoService.provinceDataDeal().then(res => {
        this.localStorage.setItemAnyTime('area', res, 1);
        return this.provinces = res;  // 获取省级名称
      });
    }
  }

  valueChange(value){
    let cityArray = this.cities[value[0]];
    cityArray.forEach(_city => {
      if(_city.value === value[1]){
        if(this._isleaf){
          this.locationAddress.emit(_city);
          return;
        }else{
          let children = _city.children;
          children.forEach( child =>{
            if( child.value === value[2]){
              //将城市对应的省事区参数全部返回。
              this.locationAddress.emit(child);
              return ;
            }
          })
        }
      }
    });
  }

  /** load data async */
  loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.index === -1) {
      e.resolve(this.provinces);
      return;
    }

    const option = e.option;
    option.loading = true;
    if (e.index === 0) {
      option.loading = false;
      this.configInfoService.getCities(option.pro_id, option.value, { isLeaf : this._isleaf}).then(res => {
        this.cities = res;
        return e.resolve(this.cities[option.value]);
      })
    }
    if (e.index === 1) {
      option.loading = false;
      this.configInfoService.getCities(option.city_id, option.value, { isLeaf: true}).then(res => {
        this.district = res;
        return e.resolve(this.district[option.value]);
      })
    }
  }

}
