import { Component, OnInit } from '@angular/core';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  public userInfos = {};//个人首页返回的信息存储。
  public isUserInfos: Boolean = false; // 个人信息是否成功返回;
  public option = new FormData(); // 存储表单数据
  constructor(
    private userInfoService: UserInfosService
  ) { }

  ngOnInit() {
    this.getUserInfos();
  }

  getUserInfos(){
    this.userInfoService.getBaseInfos().then(res=>{
      if(res['code'] === 1){
        this.userInfos = res['data'];
        this.isUserInfos = true;
        if(this.userInfos['user'].head_pic){
          this.avatarUrl = this.userInfos['user'].head_pic;
        }else{
          this.avatarUrl = '/default.png';
        }
      }
    })
  }

  loading = false;
  avatarUrl: string;

  beforeUpload = (file: File) => {
    const isJPG = file.type.indexOf('image/') != -1;
    if (!isJPG) {
      this.userInfoService.showMessage('error', '必须上传图片文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      this.userInfoService.showMessage('error', '上传图片超过1M，请重新选择！');
    }
    return isJPG && isLt2M;
  }

  handleChange(info) {
    let _input = document.querySelector("#logo_pic");
    let _file = _input['files'][0];

    let flag:boolean = this.beforeUpload(_file);
    if(!flag){
      return;
    }
    this.option.append('head_pic', _file);
    this.userInfoService.postPhotoPic(this.option).then(res=>{
      if(res['code'] === 1){
        this.getBase64(_file, (img: any) => {
          this.avatarUrl = img;
        });
        this.userInfoService.showMessage('success', '头像更新成功');
      }else if(res['code'] === 0){
        let errorMsg = '';
        for (let key in res['data']) {
          if (res['data'].hasOwnProperty(key)) {
            errorMsg += res['data'][key] + '<br>';
          }
        }
        this.userInfoService.error({
          title: '上传失败',
          content: errorMsg
        })
      }else{
        this.userInfoService.showMessage('error', res['msg']);
      }
    })
  }  
  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
