import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumePreviewService } from './resume-service/resume-preview.service';

@Component({
  selector: 'app-resume-preview',
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.css']
})
export class ResumePreviewComponent implements OnInit {
  public resume_id:number;
  public resumeDetail= {};// 简历详情信息
  public isResume = false;//简历信息是否存在
  public localUrl:string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private resumePreviewService: ResumePreviewService
  ) {
    this.localUrl = window.location.href;
  }

  ngOnInit() {
    this.resumePreviewService.setTitle('个人简历预览');
    // 获取当前简历的resume_id后，传递给子组件
    this.activatedRoute.params.subscribe( (params) => {
      this.resume_id = params['resume_id'];
      this.getResumeInfo();
    });
  }

  getResumeInfo(){
    this.resumePreviewService.getResumeInfoPreview({resume_id: this.resume_id}).then(res=>{
      if(res['code'] === 1){
        this.resumeDetail = res['data'];
        this.isResume = true;
        this.resumePreviewService.setTitle(this.resumeDetail['name'] + "-简历预览")
      }
    })
  }
}
