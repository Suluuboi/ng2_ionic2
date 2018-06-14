import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigInfoService } from '../../../../_core/service/_config-service/config-info.service';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfosForm: FormGroup;
  public degree: Array<any>;// 配置学历信息
  public defaultDegree; //设置学历显示的初始值
  public experience: Array<any>;
  public options = new FormData(); // 存储表单数据

  public isUpDate: Boolean = true;

  constructor(
    private fb: FormBuilder,
    private userInfosService: UserInfosService,
    private configInfoService: ConfigInfoService
  ) {
    // 初始化配置信息 (学历信息)
    if (this.userInfosService.getLocalStorageItem('degree')) {
      this.degree = this.userInfosService.getLocalStorageItem('degree');
    } else {
      this.configInfoService.getDegreeInfo().then(res => {
        return this.degree = res;
      })
    }
    if (this.userInfosService.getLocalStorageItem('com_exp')) {
      this.experience = this.userInfosService.getLocalStorageItem('com_exp');
    } else {
      this.configInfoService.getexperienceInfos().then(res => {
        return this.experience = res;
      })
    }
  }

  ngOnInit() {
    this.isUpDate = true;
    this.userInfosForm = this.fb.group({
      name: [null, [Validators.required]],//姓名
      head_pic: [null, [Validators.required]],//photo
      sex: [null, [Validators.required]],//性别
      email: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')]],
      idcard: [null, [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{16}[(0-9)|x|X]$")]],//身份证号码
      birthday: [null, [Validators.required]],//出生年月
      education_id: [null, [Validators.required]],//最高学历
      experience_id: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],//工作年限
      self_state: [null, Validators.required],//工作状态
    });
    this.setFormValue();
    this.userInfosForm.valueChanges.subscribe(() => {
      this.isUpDate = false;
    })
  }
  setFormValue() {
    this.userInfosService.getUserInfos().then(res => {
      if (res) {
        this.userInfosForm.patchValue({
          name: res.name,
          sex: res.sex,
          head_pic: res.head_pic,
          email: res.email,
          idcard: res.idcard,
          birthday: new Date(res.birthday),
          education_id: res.education_id,
          experience_id: res.experience_id,
          self_state: res.self_state,
        });
        // set photo url 
        this.avatarUrl = res.head_pic;
        this.isUpDate = true;
      }
    })
  }

  _submitUserInfosForm() {
    for (const i in this.userInfosForm.controls) {
      this.userInfosForm.controls[i].markAsDirty();
    }
    if (this.userInfosForm.status == "VALID") {
      this.dealWidthUpdateInfos(this.userInfosForm.value);
    } else {
      return false;
    }
  }
  dealWidthUpdateInfos(option) {
    for (const attr in option) {
      if (option.hasOwnProperty(attr)) {
        if (attr === 'birthday') {
          let _birthday = this.userInfosService.changDatefunction(option[attr]);
          this.options.append('birthday', _birthday);
        } else if (attr === 'head_pic') {
          continue;
        } else {
          this.options.append(attr, option[attr]);
        }
      }
    }
    this.updateUserInfo();
  }

  updateUserInfo() {
    this.userInfosService.updateUserInfos(this.options).then(res => {
      if (res['code'] === 1) {
        this.userInfosService.showMessage('success', '个人资料更新成功');
        this.isUpDate = true;
        this.deletedOptionsFormData(this.userInfosForm.value);
      } else {
        let errorMsg = res['data'];
        let errorText = "";//将提交后，后台返回的数据错误信息返回给前端
        for (let i in errorMsg) {
          errorText += errorMsg[i] + '<br>';
        }
        this.userInfosService.error({
          title: "保存失败",
          content: errorText
        });
      }
    });
  }
  deletedOptionsFormData = (object) => {
    for (let attr in object) {
      if (object.hasOwnProperty(attr)) {
        this.options.delete(attr);
      }
    }
  }
  /********file upload ********/
  loading = false;
  avatarUrl: string;

  beforeUpload = (file: File) => {
    const isJPG = file.type.indexOf('image/') != -1;
    if (!isJPG) {
      this.userInfosService.showMessage('error', '必须上传图片文件');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      this.userInfosService.showMessage('error', '上传图片超过1M，请重新选择！');
    }
    return isJPG && isLt1M;
  }

  handleChange(info) {
    let _input = document.querySelector("#head_pic");
    let _file = _input['files'][0];
    if (_file != undefined) {
      let flag: boolean = this.beforeUpload(_file);
      if (!flag) {
        return;
      }
      this.options.append('head_pic', _file);
      this.userInfosForm.patchValue({
        head_pic: _file
      });
      this.getBase64(_file, (img: any) => {
        this.avatarUrl = img;
      });
    }
  }

  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }
  getFormControl(name) {
    return this.userInfosForm.controls[name];
  }
  _disabledDate = function (current) {
    return current && current.getTime() > Date.now();
  };
}