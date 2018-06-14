import { Component, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conference-room-form',
  templateUrl: './conference-room-form.component.html',
  styleUrls: ['./conference-room-form.component.css']
})
export class ConferenceRoomFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder
  ) {
    this.subject.on('onDestory', () => {
      // console.log('destroy');
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      room_name: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      max_count: [ null, [ Validators.required ] ]
      
    });
  }
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if(this.validateForm.valid){
      this.emitDataOutside(this.validateForm.value);
      this.handleCancel();
    }
  }
  emitDataOutside(value) {
    let opt = {
      value: value,
      isEdit: true
    }
    this.subject.next(opt);
  }

  handleCancel() {
    this.subject.destroy('onCancel');
  }
}
