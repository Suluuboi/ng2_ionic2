import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigInfoService } from '../../../../_core/service/_config-service/config-info.service';
import { CompanyInfosService } from '../company-admin-service/company-infos.service';

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.css']
})
export class BaseInfoComponent implements OnInit {

  public CompanyStatus = [];// 公司性质
  public industryClass = [];// 行业性质
  // 双向绑定处理验证提示效果
  public defaultAddress: any[]; // 设置默认单位地址
  public _description = ''; //设置单位默认简介
  public license_pic = ''; //营业执照src地址
  public isLicense = false;
  public idcard_pic = ''; //法人身份证
  public isIdcard = false;
  public option = new FormData(); // 存储表单数据
  companyInfoForm: FormGroup;
  public companyInfo;

  constructor(
    private fb: FormBuilder,
    private companyInfoService: CompanyInfosService,
    private configInfoService: ConfigInfoService
  ) {
    // 获取单位性质
    if (this.companyInfoService.getLocalStorageItem('com_status')) {
      this.CompanyStatus = this.companyInfoService.getLocalStorageItem('com_status');
    } else {
      this.configInfoService.getCompanyStatusInfos().then(res => {
        this.CompanyStatus = res;
      })
    }
    // 获取行业性质
    if (this.companyInfoService.getLocalStorageItem('industry')) {
      this.industryClass = this.companyInfoService.getLocalStorageItem('industry');
    } else {
      this.configInfoService.getindustryInfos().then(res => {
        this.industryClass = res;
      })
    }
  }

  ngOnInit() {
    this.companyInfoForm = this.fb.group({
      name: [null, [Validators.required]],//单位名称
      logo_pic: [null, [Validators.required]],
      industry_id: [null, [Validators.required]],//单位行业
      com_status_id: [null, [Validators.required]],//公司性质
      district_id: [null, [Validators.required]],//单位所在地(省市级联)
      address: [null, [Validators.required]],//单位所在地(省市级联)
      email: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')]],
      description: [null, [Validators.required]],//单位简介
      license_pic: [null, Validators.required],//工商营业执照、组织机构代码
      idcard_pic: [null, Validators.required],// 法人身份证
      web_url: [null]//公司网址
    });
    this.setCompanyInfos();
  }
  _submitCompanyInfoForm() {
    for (const i in this.companyInfoForm.controls) {
      this.companyInfoForm.controls[i].markAsDirty();
    }
    if (this.companyInfoForm.status === "VALID" || (this.companyInfoForm.status === 'INVALID' && this.isIdcard && this.isLicense)) {
      this.dealWidthFormValue(this.companyInfoForm.value);
    }
  }
  // object copy data 
  dealWidthFormValue(object) {
    for (const attr in object) {
      if (object.hasOwnProperty(attr)) {
        if (attr === 'logo_pic' || attr === 'license_pic' || attr === 'idcard_pic') {
          continue;
        }
        this.option.append(attr, object[attr]);
      }
    }
    this.upDateBaseInfos();
  }
  // update base infos
  upDateBaseInfos() {
    this.companyInfoService.updateCompanyInfo(this.option).then(res => {
      if (res['code'] === 1) {
        this.deletedOptionsFormData(this.companyInfoForm.value);
        // 判断头像是否上传，选择跳转页面
        this.companyInfoService.showMessage('success', '单位资料更新成功');
      } else {
        let errorMsg = "";
        for (let i in res['data']) {
          errorMsg += res['data'][i] + '<br>';
        }
        this.companyInfoService.error({
          title: '更新失败',
          content: errorMsg
        })
      }
    })
  }
  deletedOptionsFormData = (object) => {
    for (let attr in object) {
      if (object.hasOwnProperty(attr)) {
        this.option.delete(attr);
      }
    }
  }
  // 给表单设置默认值
  setCompanyInfos() {
    // 获取单位资料
    this.companyInfoService.getCompanyBaseInfos().then(res => {
      if (res['code'] === 1 && res['data']) {
        let opt = res['data'];
        this.companyInfo = res['data'];
        let area = opt.area;
        this.defaultAddress = [area[0].name, area[1].name, area[2].name];
        // 给省市区赋值
        this.option.append('province_id', area[0].id);
        this.option.append('city_id', area[1].id);
        this.option.append('district_id', area[2].id);

        this._description = opt.description;
        this.license_pic = opt.license_pic;
        this.idcard_pic = opt.idcard_pic;
        this.avatarUrl = opt.logo_pic;

        this.isLicense = true;
        this.isIdcard = true;
        this.companyInfoForm.patchValue({
          name: opt.name,
          logo_pic: opt.logo_pic,
          industry_id: opt.industry_id,
          com_status_id: opt.com_status_id,
          district_id: area[2].id,
          address: opt.address,
          email: opt.email,
          description: opt.description,
          license_pic: opt.license_pic,
          idcard_pic: opt.idcard_pic,
          web_url: opt.web_url == 'null' ? '' : opt.web_url
        });
      }
    });
  }
  public isVisiblelicense: boolean = false;
  public isVisibleidcard: boolean = false;
  showModallicense = () => {
    this.isVisiblelicense = true;
  };
  showModalidcard = () => {
    this.isVisibleidcard = true;
  };

  handleOklicense = (e) => {
    this.isVisiblelicense = false;
  };

  handleOkidcard = (e) => {
    this.isVisibleidcard = false;
  };
  handleCancelModal = (e) => {
    this.isVisiblelicense = false;
    this.isVisibleidcard = false;
  }
  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.companyInfoForm.controls[name];
  }

  // 获取省市级联的信息
  getCompanyLocation(value) {
    let _city = value.parent;
    let _province = _city.parent;
    this.companyInfoForm.patchValue({
      district_id: value.city_id
    });
    this.option.append('district_id', value.city_id);
    this.option.append('city_id', _city.city_id);
    this.option.append('province_id', _province.pro_id);
  }
  // 获取单位简介内容
  getProflieContent(value) {
    this.companyInfoForm.patchValue({
      description: value
    });
  }
  /********file upload ********/
  loading = false;
  avatarUrl: string;

  beforeUpload = (file: File, _size: number) => {
    const isJPG = file.type.indexOf('image/') != -1;
    if (!isJPG) {
      this.companyInfoService.showMessage('error', '必须上传图片文件');
    }
    const isLt2M = file.size / 1024 / 1024 < _size;
    if (!isLt2M) {
      this.companyInfoService.showMessage('error', `上传图片超过${_size}M，请重新选择！`);
    }
    return isJPG && isLt2M;
  }

  handleChange(info) {
    let _input = document.querySelector("#logo_pic");
    let _file = _input['files'][0];
    if (_file != undefined) {
      let flag: boolean = this.beforeUpload(_file, 1);
      if (!flag) {
        return;
      }
      this.option.append('logo_pic', _file);
      this.companyInfoForm.patchValue({
        logo_pic: _file
      });
      this.getBase64(_file, (img: any) => {
        this.avatarUrl = img;
      });
    }
  }
  picLicenseChange() {
    let _input = document.querySelector("#license_pic");
    let _file = _input['files'][0];
    if (_file != undefined) {
      let flag: boolean = this.beforeUpload(_file, 2);
      if (!flag) {
        return;
      }
      this.option.append('license_pic', _file);
      this.companyInfoForm.patchValue({
        license_pic: _file
      });
      this.getBase64(_file, (img: any) => {
        this.isLicense = true;
        this.license_pic = img;
      });
    }
  }
  picIdcardChange() {
    let _input = document.querySelector("#idcard_pic");
    let _file = _input['files'][0];
    if (_file != undefined) {
      let flag: boolean = this.beforeUpload(_file, 2);
      if (!flag) {
        return;
      }
      this.option.append("idcard_pic", _file);
      this.companyInfoForm.patchValue({
        idcard_pic: _file.name
      })
      this.getBase64(_file, (img: any) => {
        this.isIdcard = true;
        this.idcard_pic = img;
      });
    }
  }

  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
