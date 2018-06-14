import { LocalStorageService } from './../../../_core/service/_config-service/local-storage.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConfigInfoService } from '../../../_core/service/_config-service/config-info.service';

@Component({
  selector: 'app-job-category',
  template: `
  <nz-cascader
    [(ngModel)]="DefaultValue"
    (ngModelChange)="_console($event)"
    [nzPlaceHolder]="'请选择职位类别'"
    (nzLoad)="loadData($event)">
  </nz-cascader>`,
  styles: [`
    .ant-cascader-menu{height: auto!important;}
  `]
})
export class JobCategoryComponent implements OnInit {

  public firstTypes;// 一级职位类别

  public secondTypes;  // 二级职位类别

  public thirdType; // 三级职位类别

  @Output('companyLocation')
  locationAddress: EventEmitter<any> = new EventEmitter();

  // 省市级联

  @Input()
  DefaultValue: any[];
  // _value: any[] = [
  //   {value: "北京", label: "北京"},
  //   {value: "北京", label: "北京"}
  // ];
  // _value =  ["aaas", "a-1", "sss"];

  constructor(
    private configInfoService: ConfigInfoService,
    private localStorageService: LocalStorageService
  ) { }
  ngOnInit() {
    if (this.localStorageService.getItem('firstJobsType')) {
      this.firstTypes = this.localStorageService.getItem('firstJobsType');
    } else {
      this.configInfoService.firstLevelJobsTypeDeal().then(res => {
        return this.firstTypes = res;  // 获取省级名称
      });
    }

  }
  _console(value) {
    if (value.length !== 0) {
      let cityArray = this.secondTypes[value[0]];
      cityArray.forEach(_city => {
        if (_city.value === value[1]) {
          let children = _city.children;
          children.forEach(child => {
            if (child.value === value[2]) {
              //将城市对应的省事区参数全部返回。
              this.locationAddress.emit(child);
            }
          })
        }
      });
    }
  }

  /** load data async */
  loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.index === -1) {
      e.resolve(this.firstTypes);
      return;
    }

    const option = e.option;
    option.loading = true;
    if (e.index === 0) {
      option.loading = false;
      this.configInfoService.childrenJobsType(option.job_type_id, option.value, { isLeaf: false }).then(res => {
        this.secondTypes = res;
        return e.resolve(this.secondTypes[option.value]);
      })
    }
    if (e.index === 1) {
      option.loading = false;
      this.configInfoService.childrenJobsType(option.job_type_id, option.value, { isLeaf: true }).then(res => {
        this.thirdType = res;
        return e.resolve(this.thirdType[option.value]);
      })
    }
  }
}

