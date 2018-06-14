import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RegisterService {
    constructor(
        private http: HttpClient,
        private route: Router
    ) { }
    registeEnd(option) {
        // 处理获取的数据
        var _opt = new Object();
        _opt['type'] = option.select;
        _opt['phone'] = option.phoneNumber;
        _opt['password'] = option.password;
        _opt['password_confirmation'] = option.checkPassword;
        _opt['code'] = option.checkNumber;
        return this.http.post('/api/register', _opt).toPromise().then(res => {
            return res;
        });
    }
    navTo = (url) => {
        this.route.navigateByUrl(url);
    }
}
