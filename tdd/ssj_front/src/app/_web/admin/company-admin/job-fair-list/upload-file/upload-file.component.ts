import { Component, OnInit, Input } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { CompanyInfosService } from '../../company-admin-service/company-infos.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  fair_id:string; // 招聘会id
  public options = new FormData();
  @Input()
  set id(value: string){
    this.fair_id = value;
  }
  
  constructor(
    private companyInfoService: CompanyInfosService,
    private subject: NzModalSubject
  ) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit(){

  }
  uploadFileChange(idName){
    this.options.append('fair_id', this.fair_id);
    let _file = $("#" + idName)[0].files[0];
    this.options.append(idName, _file);
    //set files name
    $('#'+idName).siblings().eq(1).find('span.file-name').eq(0).html(_file.name);
    this.companyInfoService.uploadJobfairFiles(this.options).then(res=>{
      if(res['code'] === 1){
        this.companyInfoService.showMessage('success', res['msg']);
      }else{
        this.companyInfoService.showMessage('error', res['msg']);
      }
    })
  }
  // close  modal
  handleCancel(e) {
    this.subject.destroy('onCancel');
  }
}