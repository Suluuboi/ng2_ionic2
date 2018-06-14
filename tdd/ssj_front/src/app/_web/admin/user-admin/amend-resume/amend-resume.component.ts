import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-amend-resume',
  templateUrl: './amend-resume.component.html',
  styleUrls: ['./amend-resume.component.css']
})
export class AmendResumeComponent implements OnInit {

  public resume_id: number;

  public userinfo = [];// 个人基本信息
  public jobIntention = {}; //求职意向
  public workexp = []; //工作经验
  public eduexp = []; //教育经历
  public trainexp = []; //培训经历
  public skillexp = []; //职业技能
  public projectexp = []; //项目经验
  public otherexp = []; //其他信息
  public selfmsg = ''; //自我评价
  constructor(
    private activatedRoute: ActivatedRoute,
    private userInfosService: UserInfosService
  ) { }
  ngOnInit() {
    this.userInfosService.setTitle('简历修改');
    // 获取当前简历的resume_id后，传递给子组件
    this.activatedRoute.params.subscribe((params) => {
      this.resume_id = params['id'];
    })
    this.userInfosService.getResumeAllInfos({ resume_id: this.resume_id }).then(res => {
      if (res['code'] === 1) {
        let data = res['data'];
        this.userInfosService.setTitle(data['resume']['name'] + '-简历修改');
        for (let i in data) {
          if (i === 'user_info') {// 个人信息
            this.userinfo = data['user_info'];
          }
          if (i === 'resume') {// 求职意向
            this.jobIntention = data['resume'];
          }
          if (i === "works") { // 工作经历
            this.workexp = data['works'];
          }
          if (i === "educations") {// 教育经历
            this.eduexp = data['educations'];
          }
          if (i === "trainings") {// 培训经历
            this.trainexp = data['trainings'];
          }
          if (i === "skills") {//专业技能
            this.skillexp = data['skills'];
          }
          if (i === "projects") {// 项目经验
            this.projectexp = data['projects'];
          }
          if (i === "others") {// 其他信息
            this.otherexp = data['others'];
          }
          if (i === "self_evaluation") {// 自我评价
            this.selfmsg = data.self_evaluation;
          }
        }
      }
    })
  }
}
