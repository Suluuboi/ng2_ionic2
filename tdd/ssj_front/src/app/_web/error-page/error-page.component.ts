import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
  <div class="header hidden-xs hidden-sm hidden-md">
    <header>
        <a [routerLink]="['/index']">
            <img src="./assets/lib/images/logoin_logo2.png" alt="网站logo">
        </a>
    </header>
  </div>
  <div class="error-bg">
    <div class="content">
      <img src="/assets/lib/images/error-404.png" alt="错误页面" />
    </div>
  </div>
  `,
  styles: [`
    .header{
      height: 150px;
      width: 100%;
      overflow: hidden;}
    .header header img { margin:42px 0 0 350px;}
      .error-bg{
        width: 100%; background:url(/assets/lib/images/regiser-bg.jpg);height: 569px;
        background-size: cover;
        overflow:hidden;
      }
    .content{
      margin: 120px auto;
      text-align:center;
    }
    .content img{
      width: 550px;
    }
    @media (max-width: 576px) {
    .content{
      margin: 25px auto;
      text-align:center;
    }
    .content img{
      width: 300px;
    }
  }
  `]
})
export class ErrorPageComponent implements OnInit {

  public status = '404';
  public describe = '您访问的页面不存在';

  _STATUS = {
    404: '页面未找到',
    500: '网络请求错误',
    504: '网络请求超时'
  }

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let _status = this.activatedRoute.snapshot.queryParams['id'];
    if (this._STATUS[_status]) {
      this.status = _status;
      this.describe = this._STATUS[this.status];
    }
  }

  ngOnInit() {

  }
  goback() {
    window.history.back();
  }

  goIndex() {
    this.route.navigateByUrl('');
  }
}