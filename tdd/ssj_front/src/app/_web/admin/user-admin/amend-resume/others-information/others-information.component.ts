import { Component,OnChanges, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserInfosService } from '../../user-admin-service/user-admin.service';

@Component({
  selector: 'app-others-information',
  templateUrl: './others-information.component.html',
  styleUrls: ['./others-information.component.css']
})
export class OthersInformationComponent implements OnChanges, OnInit {
  
  @Input()
  resumeId;
  @Input()
  otherexp;

  public otherExpForm: FormGroup;//其他经历表单
  public isAddOtherExp = false;//如果添加其他经历，
  public otherExp = [];// 其他经历数组
  public isEdit: boolean = false; // 判断当前提交是增加其他经验还是修改其他经验 true: 添加； false: 添加
  public currentOther_id:number; //保存当前其他经验的 work_id
  constructor(
    private fb:FormBuilder,
    private userInfosService: UserInfosService
  ) { }

  ngOnChanges(){
    this.getWorksExp();
  }
  ngOnInit() {
    this.otherExpForm = this.fb.group({
      name: [null,[Validators.required]],
      content: [ null,[Validators.required]]
    });
  }
  _submitForm(){
    for (const i in this.otherExpForm.controls) {
      this.otherExpForm.controls[i].markAsDirty();
    }
    // 将时间转换成 2017-12-12格式上传
    if(this.otherExpForm.value.start_time && this.otherExpForm.value.end_time){
      let _start = this.changDatefunction(this.otherExpForm.value.start_time);
      let _end = this.changDatefunction(this.otherExpForm.value.end_time);
      // 将时间对应添加到表单对象中
      this.otherExpForm.patchValue({start_time: _start, end_time: _end});
    }
    
    // 根据判断 是否为添加其他经验调用不同的接口方法
    if(!this.isEdit){
      this.userInfosService.addResumeOthersInfo(this.otherExpForm.value, this.resumeId).then(res=>{
        if(res['code'] === 1){
          this.updateInfosContent();
        }
      })
    }else{
      let current_id = this.currentOther_id;
      this.userInfosService.addResumeOthersInfo(this.otherExpForm.value, this.resumeId, this.currentOther_id).then(res=>{
        if(res['code'] === 1){
          this.updateInfosContent();
        }
      })
    }
  }
  // 时间处理方法
  changDatefunction(d){
    let t = new Date(d);
    return t.getFullYear() + "-" + ((t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)) + "-" + (t.getDate() < 10 ? '0' + t.getDate() : t.getDate());
  }
  // 获取其他经历
  getWorksExp(){
      if(this.otherexp){
        this.otherExp = this.otherexp;
      }else{
        this.otherExp = []
      }
  }
  getFormControl(name) {
    return this.otherExpForm.controls[ name ];
  }

  editWorksExp(resume_other_id, i){
    this.isAddOtherExp = true;
    this.isEdit = true;
    this.currentOther_id = resume_other_id;
    this.setFormDefaultValue(this.otherExp[i]);
  }
  deletWorksExp(resume_other_id){
    this.userInfosService.deleteResumeOthersInfo(this.resumeId,resume_other_id).then(res=>{
      if(res['code'] === 1){
        this.updateInfosContent();
        this.userInfosService.success({
          title: '删除成功',
          content: '其他经历删除成功'
        })
      }
    })
  }
  // 给表单设置默认值
  setFormDefaultValue(opt){
    this.otherExpForm.setValue({
      name : opt.name,
      content : opt.content
    })
  }
  handleOk = () => {
    if(this.otherExpForm.status === 'INVALID'){
      return false;
    }
    this._submitForm();
    // 关闭当前模态框表单
    this.isAddOtherExp = false;
    this.isEdit = false;
    this.currentOther_id = null;
  }
  handleCancel = () => {
    this.isAddOtherExp = false;
  }
  showModal = (e) => {
    this.isEdit = false;
    this.isAddOtherExp = true;
    this.resetForm(e);
  }
  // 重置表单内容(清空表单)
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.otherExpForm.reset();
    for (const key in this.otherExpForm.controls) {
      this.otherExpForm.controls[ key ].markAsPristine();
    }
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
  updateInfosContent(){
    this.userInfosService.getResumeOthersInfo(this.resumeId).then(res=>{
      if(res['code'] === 1){
        this.otherExp = res['data'];
      }
    })
  }
  // 修改、或者删除某一项内容后，从新获取当前内容的列表
}
