import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfigInfoService } from '../../../../../_core/service/_config-service/config-info.service';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';


@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnChanges, OnInit {

  @Input()
  editJobInfo;// 判断为新增职位还是编辑职位
  @Input()
  jobId; //为编辑职位时，获取职位id。
  public isJobAdd = '发布职位';
  @Output()
  formValue: EventEmitter<any> = new EventEmitter;
  public jobAddForm: FormGroup;
  // 子组件绑定
  public defaultAddress: any[];
  public jobClass: any[]; //职位类别

  public ENDTIME = null;
  // 编辑器
  config = {
    filebrowserBrowseUrl: '&&&&&',
    filebrowserUploadUrl: '&&&'
  };

  // 多选框组 语言要求
  checkOptionslanguage = [];
  // 福利待遇
  checkOptionsWelfare = [];
  // 薪资
  jobSalaryArr = [];
  // 从事行业
  public jobIndustryArr = [];
  // 工作性质
  public workTypeArr = [];
  // 工作经验
  public workExpArr = [];
  // 学历要求
  public minDegreeArr = [];
  public options: object = {}; //将提交的所有数据全部整理到当前对象中，返回给父组件

  public isUpDate: Boolean = true;
  constructor(
    private fb: FormBuilder,
    private configInfoService: ConfigInfoService,
    private companyInfosService: CompanyInfosService
  ) { }

  ngOnChanges() {
    // 获取单位福利待遇
    if (this.companyInfosService.getLocalStorageItem('welfare')) {
      this.checkOptionsWelfare = this.companyInfosService.getLocalStorageItem('welfare');
    } else {
      this.configInfoService.getwelfareInfos().then(res => {
        if (res) {
          this.checkOptionsWelfare = res;
        }
      })
    }
    // 获取语言信息列表
    if (this.companyInfosService.getLocalStorageItem('lang')) {
      this.checkOptionslanguage = this.companyInfosService.getLocalStorageItem('lang');
    } else {
      this.configInfoService.getlanguageInfos().then(res => {
        if (res) {
          this.checkOptionslanguage = res;
        }
      })
    }
    // this.checkOptionslanguage = this.dealDataFormat(this.checkOptionslanguage);
    // 获取行业信息列表
    if (this.companyInfosService.getLocalStorageItem('industry')) {
      this.jobIndustryArr = this.companyInfosService.getLocalStorageItem('industry');
    } else {
      this.configInfoService.getindustryInfos().then(res => {
        if (res) {
          this.jobIndustryArr = res;
        }
      })
    }
    // 薪资待遇
    if (this.companyInfosService.getLocalStorageItem('salary')) {
      this.jobSalaryArr = this.companyInfosService.getLocalStorageItem('salary');
    } else {
      this.configInfoService.getSalaryInfo().then(res => {
        if (res) {
          this.jobSalaryArr = res;
        }
      })
    }
    // 学历要求
    if (this.companyInfosService.getLocalStorageItem('degree')) {
      this.minDegreeArr = this.companyInfosService.getLocalStorageItem('degree');
    } else {
      this.configInfoService.getDegreeInfo().then(res => {
        if (res) {
          this.minDegreeArr = res;
        }
      })
    }
    // 单位发布职位对工作经验要求
    if (this.companyInfosService.getLocalStorageItem('com_exp')) {
      this.workExpArr = this.companyInfosService.getLocalStorageItem('com_exp');
    } else {
      this.configInfoService.getexperienceInfos().then(res => {
        if (res) {
          this.workExpArr = res;
        }
      })
    }
    // 单位工作性质
    if (this.companyInfosService.getLocalStorageItem('job_type')) {
      this.workTypeArr = this.companyInfosService.getLocalStorageItem('job_type');
    } else {
      this.configInfoService.getJobTypeInfo().then(res => {
        if (res) {
          this.workTypeArr = res;
        }
      })
    }
    // 单位工作性质
  }

  ngOnInit() {
    this.companyInfosService.setTitle('职位添加-招聘管理-单位用户中心');
    // 初始化表单
    this.jobAddForm = this.fb.group({
      name: [null, [Validators.required]],//职位名称
      industry_id: [null, [Validators.required]],//从事行业
      third_position_id: [null, [Validators.required]],//职位类别
      district_id: [null, [Validators.required]],//工作地点(省市级联)
      address: [null, [Validators.required]],//工作 详细地址
      salary_id: [null, [Validators.required]],//薪资待遇
      description: [null, [Validators]],//职位描述
      // 补充信息(其它内容)
      number: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],//招聘人数
      experience_id: [null, [Validators.required]],//工作经验
      education_id: [null, [Validators.required]],//学历要求
      job_type_id: [null, [Validators.required]],// 工作性质
      lang: [null, [Validators.required]],//要求语种
      end_time: [null, [Validators.required]],//职位过期时间
      welfare: [null, [Validators.required]],//福利待遇，如五险一金
      // 联系方式(个人填写(默认单位))
      phone: [ null, [Validators.required, Validators.pattern('^0?(13|14|15|18)[0-9]{9}$')]],
      email: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')]]
    });

    if (this.editJobInfo) {
      this.isJobAdd = '修改职位';
      this.companyInfosService.getPositionInfo(this.jobId).then(res => {
        if (res['code'] === 1) {
          this.companyInfosService.setTitle(res['data'].name + '-职位编辑-招聘管理');
          this.setPositionFormValue(res['data']);
        }
      })
    }
    this.jobAddForm.valueChanges.subscribe(() => {
      this.isUpDate = false;
    })
  }

  ngsumitNewJob() {
    for (const i in this.jobAddForm.controls) {
      this.jobAddForm.controls[i].markAsDirty();
    }
    if (this.jobAddForm.status == "VALID") {
      this.isUpDate = true;
      this.formValue.emit(Object.assign(this.jobAddForm.value, this.options));
    }
  }

  setPositionFormValue(_opt) {
    let _area = _opt.area;
    let _position = _opt.position;
    let _lang = this.addStatusForCheckBox(_opt.lang, this.checkOptionslanguage);
    let _welfare = this.addStatusForCheckBox(_opt.welfare, this.checkOptionsWelfare);
    this.defaultAddress = [_area[0].name, _area[1].name, _area[2].name];
    this.jobClass = [_position[0].name, _position[1].name, _position[2].name];
    // 将当前地址及职位类别对应的id存到this.options中。
    this.options['province_id'] = _area[0].id;
    this.options['city_id'] = _area[1].id;
    this.options['first_position_id'] = _position[0].id;
    this.options['second_position_id'] = _position[1].id;
    this.jobAddForm.setValue({
      name: _opt.name,
      industry_id: _opt.industry_id,
      third_position_id: _position[2].id,
      district_id: _area[2].id,
      address: _opt.address,
      salary_id: _opt.salary_id,
      description: _opt.description,
      number: _opt.number,
      experience_id: _opt.experience_id,
      education_id: _opt.education_id,
      job_type_id: _opt.job_type_id,
      lang: _lang,
      end_time: new Date(_opt.end_time),
      welfare: _welfare,
      phone: _opt.phone,
      email: _opt.email
    });
    this.isUpDate = true;
  }
  // 给当前选中的语言或者福利添加属性checked= true;
  addStatusForCheckBox(checked_arr, total) {
    checked_arr.forEach(arr => {
      total.forEach(el => {
        if (el.value === arr.id) {
          el.checked = true;
        }
      })
    });
    return total;
  }
  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  getFormControl(name) {
    return this.jobAddForm.controls[name];
  }

  // 获取职位类别
  getJobjobsClass(value) {
    this.options['third_position_id'] = value.job_type_id;
    this.options['second_position_id'] = value.parent.job_type_id;
    this.options['first_position_id'] = value.parent.parent.job_type_id;
    this.jobAddForm.patchValue({
      third_position_id: value.job_type_id
    })
  }

  // 获取工作地点
  getJobwork_address(value) {
    this.options['district_id'] = value.city_id;
    this.options['city_id'] = value.parent.city_id;
    this.options['province_id'] = value.parent.parent.pro_id;
    this.jobAddForm.patchValue({
      district_id: value.city_id
    })
  }
  // 获取职位过期时间
  _endTimeChange(value) {
    let d = new Date(value);
    let _time = this.dealDateWith(d);
    this.options['end_time'] = _time;
  }
  // 语言要求方法
  _logCheckbox(value) {
    var arr = [];
    value.forEach(el => {
      if (el.checked) {
        arr.push(el.value);//将语言要求对应的id 添加到数组中
      }
    });
    this.options['lang'] = arr;
  }

  // 福利待遇
  _logWorkWelfareBox(value) {
    var arr = [];
    value.forEach(el => {
      if (el.checked) {
        arr.push(el.value);//福利待遇对应的id 添加到数组中
      }
    });
    this.options['welfare'] = arr;
  }
  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  }

  // 职位过期时间，日历组件
  _disabledDate = function (current) {
    return current && current.getTime() < Date.now();
  };
}
