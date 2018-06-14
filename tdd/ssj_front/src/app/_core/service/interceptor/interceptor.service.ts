import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiData } from '../../../menu_config/data';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private message: NzMessageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ApiData>> {
    // const authReq = req.clone({
    //   url: (req.url + '&token=ujusaruu19')  //对任意请求的url添加token参数
    // });
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status != 200) {
          return ErrorObservable.create(event);
        }
        return Observable.create(observer => observer.next(event)); //请求成功返回响应
      }),
      catchError((res: HttpResponse<any>) => {   //请求失败处理
        let errorMsg = '';
        switch (res.status) {
          case 401:
            errorMsg = '用户未登录';
            break;
          case 403:
            errorMsg = '没有访问权限';
            break;
          case 404:
            errorMsg = '未找到页面';
          case 408:
            errorMsg = '还没有通过审核';
            break;
          case 500:
            errorMsg = '访问失败';
            break;
          case 504:
            errorMsg = '网关超时';
            break;
          case 1001:
            errorMsg = '资料未完善';
            break;
          default:
            errorMsg = '请求发生错误';
            break;
        }
        this.message.create('error', errorMsg);
        return ErrorObservable.create(event);
      })
    );
  }
}