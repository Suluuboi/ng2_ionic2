import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class CheckMsgnumberService {

  constructor(
    private http: HttpClient,
    private confirmServ: NzModalService,
    private _message: NzMessageService
  ) { }

  getCheckMsgNumber(phone){
    return this.http.post('/api/send_msg', {phone: phone}).toPromise().then(res=>{
      return res;
    })
  }
  success = (type, text) => {
    this._message.create(type, text);
  }
  error = (opt) =>{
    this.confirmServ.error({
      title: opt.title,
      content: opt.content
    })
  }
}
