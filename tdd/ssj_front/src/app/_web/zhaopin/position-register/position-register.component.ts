import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ZphService } from '../_zhaopin-service/web-zph.service';

@Component({
  selector: 'app-position-register',
  templateUrl: './position-register.component.html',
  styleUrls: ['./position-register.component.css']
})

export class PositionRegisterComponent implements OnInit {
  public options = new FormData();
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private zphService: ZphService
  ) { }


  ngOnInit() {
    this.validateForm = this.fb.group({
      name            : [ null, [ Validators.required ] ],
      pic             : [ null ],
      sex             : [ null, [ Validators.required ] ],
      marriage        : [ null, [ Validators.required ] ],
      age             : [ null, [ Validators.required ] ],
      education       : [ null, [ Validators.required ] ],
      height          : [ null, [ Validators.required ] ],
      weight          : [ null, [ Validators.required ] ],
      skill_certificate:[ null ],// 技能证书
      phone           : [ null, [ Validators.required ] ],
      address         : [ null, [ Validators.required ] ],
      idcard          : [ null, [ Validators.required ] ],
      e_contact       : [ null, [ Validators.required ] ],
      e_phone         : [ null, [ Validators.required ] ],
      industry        : [ null, [ Validators.required ] ],
      work_time       : [ null, [ Validators.required ] ],
      salary          : [ null, [ Validators.required ] ],
      work_address    : [ null, [ Validators.required ] ],
      welfare         : [ null, [ Validators.required ] ],
      type            : [ null, [ Validators.required ] ],
      work_experience : [ null, [ Validators.required ] ],
      train           : [ null ],
      note            : [ null ]
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    for(let attr in this.validateForm.value){
        if(attr != 'pic'){
          if(attr === 'work_experience'){
            this.options.append(attr, JSON.stringify(this.validateForm.value[attr]));
          }else{
            this.options.append(attr, this.validateForm.value[attr]);
          }
        }
      }
    if(this.validateForm.valid){
      
      this.zphService.jobsPositionRegister(this.options).then(res=>{
        if(res['code'] === 1){
          this.zphService.showMessage('success', '登记成功，立即前往职位列表页');
          this.zphService.navTo('/zhaopin/home');
        }else{
          this.zphService.showMessage('error', res['msg']);
        }
      });
    }else{
      this.zphService.showMessage('error', '所有带*号的为必填内容，不能为空！');
    }
  }

  // 获取工作经验
  getWorkExpirence(opt){
    this.validateForm.patchValue({
      "work_experience": opt
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
  /********file upload ********/
  loading = false;
  avatarUrl: string;

  beforeUpload = (file: File) => {
    const isJPG = file.type.indexOf('image/') != -1;
    if (!isJPG) {
      this.zphService.showMessage('error', '必须上传图片文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.zphService.showMessage('error', '上传图片超过2M，请重新选择！');
    }
    return isJPG && isLt2M;
  }

  handleChange(info) {
    let _input = document.querySelector("#pic");
    let _file = _input['files'][0];
    this.options.append('pic', _file);
    this.validateForm.patchValue({
      pic : _file
    });
    this.getBase64(_file, (img: any) => {
      this.loading = false;
      this.avatarUrl = img;
    });
  }
  private getBase64(img: File, callback: (img: any) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
