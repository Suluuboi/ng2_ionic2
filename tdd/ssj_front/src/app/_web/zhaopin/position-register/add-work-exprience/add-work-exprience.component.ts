import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'add-work-exprience',
  templateUrl: './add-work-exprience.component.html',
  styleUrls: ['./add-work-exprience.component.css']
})
export class AddWorkExprienceComponent implements OnInit {
  @Output()
  workExpirences:EventEmitter<any> = new EventEmitter();

  public _array = [];
  validateForm: FormGroup;

  public formArray: Array<any> = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.createGroup();
    this.validateForm.valueChanges.subscribe(res=>{
      this._submitForm();
    })
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if(this.validateForm.status === "VALID"){
      this.dealWidthFormValue(this.validateForm.value);
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  // 处理表单中的数据，存储为array格式
  dealWidthFormValue(obj){
    this._array = [];
    this.formArray.forEach((el,i)=>{
      let opt = {};
      opt['name'] = this.validateForm.value[el.name];
      opt['date'] = this.changeRangeDatePicker(this.validateForm.value[el.date]);
      opt['content'] = this.validateForm.value[el.content];
      this._array.push(opt);
    });
    this.workExpirences.emit(this._array);
  }

  changeRangeDatePicker(value:Array<any>):string{
    let _date = '';
    let t1 = value[0];
    let t2 = value[1];
    let _t1 = t1.getFullYear() + '-' + (t1.getMonth()<9?'0'+t1.getMonth(): t1.getMonth()) + '-'+(t1.getDate()<9?'0'+t1.getDate(): t1.getDate());
    let _t2 = t2.getFullYear() + '-' + (t2.getMonth()<9?'0'+t2.getMonth(): t2.getMonth()) + '-'+(t2.getDate()<9?'0'+t2.getDate(): t2.getDate());
    return _t1 + '至' + _t2;
  }

  createGroup(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    let i = this.formArray.length;
    const config = {
      name: `name`+ i,
      date: `date`+ i,
      content: `content`+ i
    };
    const index = this.formArray.push(config);
    for (const control in config) {
      if (config.hasOwnProperty(control)) {
        this.validateForm.addControl(config[control], new FormControl(null, Validators.required));
      }
    }
  }
  removeField(i, e: MouseEvent) {
    e.preventDefault();
    if (this.formArray.length > 1) {
      let index = this.formArray.indexOf(i);
      this.formArray.splice(index, 1);
      this.validateForm.removeControl(i.name);
      this.validateForm.removeControl(i.date);
      this.validateForm.removeControl(i.content);
    }
  }
}
