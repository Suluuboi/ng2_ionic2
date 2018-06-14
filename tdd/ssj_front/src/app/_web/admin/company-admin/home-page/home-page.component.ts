import { Component, OnInit } from '@angular/core';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public isInfos:Boolean = false;
  public companyInfo = {}; // 公司信息
  public option = new FormData(); // 存储表单数据
  constructor(
    private companyInfoService: CompanyInfosService
  ) {}

  ngOnInit() {
    this.getInfoData();
  }

  getInfoData(){
    this.companyInfoService.getCompanyHomePageInfos().then(res=>{
      if(res['code'] === 1){
        this.isInfos = true;
        this.companyInfo = res['data'];
        if(this.companyInfo['user']['logo_pic']){
          this.avatarUrl = this.companyInfo['user']['logo_pic'];
        }
      }
    })
  }
  loading = false;
  avatarUrl: string;

  beforeUpload = (file: File) => {
    const isJPG = file.type.indexOf('image/') != -1;
    if (!isJPG) {
      this.companyInfoService.showMessage('error', '必须上传图片文件');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      this.companyInfoService.showMessage('error', '上传图片超过1M，请重新选择！');
    }
    return isJPG && isLt1M;
  }

  handleChange(info) {
    let _input = document.querySelector("#logo_pic");
    let _file = _input['files'][0];
    let flag:boolean = this.beforeUpload(_file);
    if(!flag){
      return;
    }
    this.option.append('logo_pic', _file);
    this.companyInfoService.postPhotoPic(this.option).then(res=>{
      if(res['code'] === 1){
        this.getBase64(_file, (img: any) => {
          this.avatarUrl = img;
        });
        this.companyInfoService.showMessage('success', 'LOGO更新成功');
      }else if(res['code'] === 0){
        let errorMsg = '';
        for (let key in res['data']) {
          if (res['data'].hasOwnProperty(key)) {
            errorMsg += res['data'][key] + '<br>';
          }
        }
        this.companyInfoService.error({
          title: '上传失败',
          content: errorMsg
        })
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }  
  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
