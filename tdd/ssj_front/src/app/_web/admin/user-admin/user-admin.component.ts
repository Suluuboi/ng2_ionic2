import { Router, NavigationEnd} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  public _body = document.getElementsByTagName('body')[0];
  public isOpenInfo : Boolean = true;
  public isOpenPerson : Boolean = false;
  public isOpenJob : Boolean = false;
  public locationHref:string = '';
  constructor(
    private router : Router
  ) {
    this.router.events.subscribe(event =>{
      if( event instanceof NavigationEnd ){
        this.locationHref = window.location.href;
        this.changeSubmenuChoese();
      }
    })
  }

  ngOnInit() {
    this._body.style.removeProperty('overflow');
  }
  changeSubmenuChoese = () => {
    if(this.locationHref.indexOf('userHome') != -1 || this.locationHref.indexOf('userInfo') != -1 || this.locationHref.indexOf('userLogo') != -1 || this.locationHref.indexOf('userPwd') != -1){
      this.isOpenInfo = true;
      this.isOpenPerson  = false;
      this.isOpenJob  = false;
    }else if(this.locationHref.indexOf('userResume') != -1 || this.locationHref.indexOf('resume') != -1){
      this.isOpenInfo = false;
      this.isOpenPerson  = true;
      this.isOpenJob  = false;
    }else{
      this.isOpenInfo = false;
      this.isOpenPerson  = false;
      this.isOpenJob  = true;
    }
  }

}
