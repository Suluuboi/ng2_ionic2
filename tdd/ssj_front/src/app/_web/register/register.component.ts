import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CheckMsgnumberService } from '../../_core/service/_user-service/check-msgnumber.service';
import { RegisterService } from './_register-service/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public _index = 60;
    public registeForm: FormGroup;
    public isSending: Boolean = false;
    public errorText = '';//注册失败的错误信息
    public btnHide: Boolean = false;//弹出框按钮隐藏

    // 添加验证
  public checkOption = {
    password : false,
  }

    constructor(
        private fb: FormBuilder,
        private regService: RegisterService,
        private checkMsgNumbeService: CheckMsgnumberService
    ) { }

    ngOnInit() {
        this.registeForm = this.fb.group({
            select: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required, Validators.minLength(11)]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            checkNumber: [null, [Validators.required]],
            agree: [true]
        });
        this.registeForm.get('password').valueChanges.subscribe(res=>{
            this.checkPasswordFunction(res);
        })
    }
    get isHorizontal() {
        return this.registeForm.controls['formLayout'] && this.registeForm.controls['formLayout'].value === 'horizontal';
    }
    getFormControl(name) {
        return this.registeForm.controls[name];
    }
    
    checkPasswordFunction = (value:string) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/;
        if(!(reg.test(value))){
        this.checkOption.password = true;
        }else{
        this.checkOption.password = false;
        }
    }
    _submitForm() {
        for (const i in this.registeForm.controls) {
            this.registeForm.controls[i].markAsDirty();
        }
        this.checkPasswordFunction(this.registeForm.value.password);// checked password
        // 登录成功后跳转到个人中心(判断注册的是个人用户还是单位用户),调用注册服务判断
        // 判断注册表单是否正确通过验证。
        if (this.registeForm.status == "VALID") {
            this.errorText = '';
            this.regService.registeEnd(this.registeForm.value).then(res => {
                if (res['code'] == 1) {
                    this.checkMsgNumbeService.success('success', '注册成功');
                    this.regService.navTo('/login');
                } else {
                    let _data = res['data']
                    for (let i in _data) {
                        this.errorText += _data[i] + '<br>';
                    }
                    this.checkMsgNumbeService.error({
                        title: '注册失败',
                        content: this.errorText
                    })
                }
            });
        } else {
            return false;
        }
    }
    updateConfirmValidator() {
        setTimeout(_ => {
            this.registeForm.controls['checkPassword'].updateValueAndValidity();
        });
    }
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.registeForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }
    getCaptcha(e: MouseEvent) {
        e.preventDefault();
    }
    // 验证码发送
    sendCheckNumber = (value) => {
        if (this.registeForm.value.phoneNumber) {
            if ((this.registeForm.value.phoneNumber).match('^0?(13|14|15|18)[0-9]{9}$')) {
                this.checkMsgNumbeService.getCheckMsgNumber(this.registeForm.value.phoneNumber).then(res => {
                    if (res['code'] === 1) {
                        this.isSending = true;
                        this.checkMsgNumbeService.success('success', '发送成功');
                        let timer = setInterval(() => {
                            this._index--;
                            if (this._index == 0) {
                                this.isSending = false;
                                clearInterval(timer);
                                this._index = 60;
                            }
                        }, 1000);
                    } else {
                        this.checkMsgNumbeService.error({
                            titile: '获取失败',
                            content: res['data']
                        })
                    }
                })
            } else {
                this.checkMsgNumbeService.error({
                    title: '获取失败',
                    content: '手机号码格式错误'
                })
            }
        } else {
            this.checkMsgNumbeService.error({
                title: '获取失败',
                content: '手机号码不能为空'
            })
        }
    }
}