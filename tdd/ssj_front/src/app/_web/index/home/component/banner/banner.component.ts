import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../../_index-service/index.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public imgs = [];
  constructor(
    private indexService: IndexService
  ) {
  }

  ngOnInit() {
    this.getImgList();
  }

  getImgList = () => {
    this.indexService.getBannerImgList().then(res=>{
      if(res['code'] === 1){
        this.imgs = res['data'];
      }else{
        this.imgs = [
          {
            path: '/assets/lib/images/banner1.jpg',
            url: ''
          }
        ]
      }
    })
  }
}
