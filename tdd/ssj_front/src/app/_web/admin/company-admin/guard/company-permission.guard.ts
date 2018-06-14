import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';
import { ApiData } from '../../../../menu_config/data';

@Injectable()
export class CompanyPermissionGuard implements CanActivate {
  public isPerfect:boolean = false;

  constructor(
    private companyInfoService: CompanyInfosService
  ){}

  canActivate() {
    // 这里判断资料是否完善, 返回 true 或 false
    return this.companyInfoService.checkUserInfoIsPermission().then((res:ApiData)=>{
      if(res.code === 1001 || res.code === 408){
        this.isPerfect = false;
        this.companyInfoService.showMessage('warning', res.msg);
        if(res.code === 1001){
          this.companyInfoService.navTo('/companyAdmin/companyInfo');
        }
        if(res.code === 408){
          this.companyInfoService.navTo('/companyAdmin/companyHome');
        }
      }
      this.isPerfect = true;
      return this.isPerfect;
    })
  }
}