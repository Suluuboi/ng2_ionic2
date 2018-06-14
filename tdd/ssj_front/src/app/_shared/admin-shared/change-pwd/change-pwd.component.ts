import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  changePwdForm: FormGroup;

  @Output()
  passwordContent: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.changePwdForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$')]],
      newPassword: [null, [Validators.required, Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$')]],
      checkNewPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  _submitForm() {
    for (const i in this.changePwdForm.controls) {
      this.changePwdForm.controls[i].markAsDirty();
    }

    if (this.changePwdForm.status == "VALID"){
      let option = this.changePwdForm.value;
      this.passwordContent.emit(option);
    }
  }


  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.changePwdForm.controls['checkNewPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePwdForm.controls['newPassword'].value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }


  getFormControl(name) {
    return this.changePwdForm.controls[name];
  }

}