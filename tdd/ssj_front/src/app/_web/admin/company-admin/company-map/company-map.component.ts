import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

export class POSITION {
  lng: any;
  lat: any;
}
@Component({
  selector: 'app-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.css']
})
export class CompanyMapComponent implements OnInit {
  validateForm: FormGroup;

  public location;
  public geocodes = []; //向子组件传递搜索到的结果
  public _position:POSITION;// 向服务器传递的经纬度参数

  constructor(
    private fb: FormBuilder,
    private companyInfosService: CompanyInfosService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    // 初始化地图位置
    this.getCompanyPosition();
    this.validateForm = this.fb.group({
      address: [null, [Validators.required]],
      city: [null]
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      let opt = this.validateForm.value;
      let _url = 'http://restapi.amap.com/v3/geocode/geo?key=d71f343e9d47a16573212769f4f21d2b&address=' + opt.address + '&city=' + opt.city;
      this.http.get(_url).toPromise().then(res => {
        console.log(res);
        
        if(res['infocode'] === '10000'){
          this.geocodes = res['geocodes'];
          let l = this.geocodes[0].location.split(',');
          this._position = {
            lng: l[0],
            lat: l[1]
          }
        }else{
          this.companyInfosService.showMessage('warning', '没有查询到！')
        }
      })
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 从map组件获取位置信息。 传递给服务器，并保存
  getPosition($event){
    this.location = $event[0] + ', ' + $event[1];
    this._position= {
      lng: $event[0],
      lat: $event[1]
    }
  }

  // 保存当前确定的单位位置信息
  saveCompanyPosition(){
    if(this._position.lng && this._position.lat){
      this.companyInfosService.saveCompanyMapPosition(this._position).then(res=>{
        if(res['code'] === 1){
          this.companyInfosService.showMessage('success', "位置更新成功");
        }else{
          this.companyInfosService.showMessage('error', '位置更新失败，请刷新浏览器后再保存位置信息！')
        }
      })
    }
  }

  getCompanyPosition(){
    this.companyInfosService.getCompanyMapPosition().then(res=>{
      if(res['code'] === 1 && res['data']){
        this._position = {
          lng: res['data']['lng'],
          lat: res['data']['lat']
        };
      }else{
        this.companyInfosService.showMessage('error', '暂无地理位置信息');
      }
    })
  }
}
