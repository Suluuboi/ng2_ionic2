import { Component, OnInit } from '@angular/core';
import { UserInfosService } from '../user-admin-service/user-admin.service';

@Component({
  selector: 'app-user-resumes',
  templateUrl: './user-resumes.component.html',
  styleUrls: ['./user-resumes.component.css']
})
export class UserResumesComponent implements OnInit {

  public resumesArray: Array<any> = []; // 存放简历的数组
  public resumeCount: Number = 8;//还可以创建的简历数量
  public scanCount: Number = 20;//简历浏览次数
  public defaultRe: String = 'default';//简历的类型是否为默认简历
  public _str = 'default';

  public isResumes = false;

  constructor(
    private userInfosService: UserInfosService
  ) {
    this.getResumesList();
  }

  ngOnInit() {

  }
  getResumesList() {
    this.userInfosService.getResumeList().then(res => {
      if (res['code'] == 1) {
        this.resumesArray = res['data'];
      } else {
        this.isResumes = true;
      }
    })
  }
  // 刷新简历
  updateResumeInfos(_id, i) {
    this.userInfosService.updateResumeInfo(_id).then(res => {
      if (res['code'] == 1) {
        this.resumesArray[i].updated_at = res['data'].time;
        this.userInfosService.showMessage('success', '刷新成功！');
      } else {
        this.userInfosService.error({
          title: "简历刷新",
          content: "刷新失败，请重试！"
        })
      }
    })
  }
  setDefaultResume(resume_id, i) {
    this.userInfosService.setDefaultResumeList({ resume_id: resume_id }).then(res => {
      if (res['code'] === 1) {
        let _resume = this.resumesArray[i];
        _resume.default = 1;// 设置 默认简历样式
        this.operSuccess('默认简历设置成功');
        this.resumesArray[0].default = 0;// 设置取消 默认简历样式
        this.resumesArray.splice(i, 1);// 删除数组中当前元素
        this.resumesArray.unshift(_resume);// 将删除的元素添加到数组第一位
      } else {
        this.operSuccess('设置默认简历失败');
      }
    })
  }

  operSuccess(text) {
    this.userInfosService.showMessage('success', text);
  }
  operError(text) {
    this.userInfosService.showMessage('error', text);
  }

  cancel = function () {
    this.userInfosService.showMessage('info', '取消删除任务');
  }

  confirm = (resume_id, i) => {
    this.userInfosService.deleteResumenInfo(resume_id).then(res => {
      if (res['code'] === 1) {
        this.resumesArray.splice(i, 1);
        this.userInfosService.showMessage('info', '已经删除该简历！');
        this.userInfosService.getResumeList().then(res => {
          if (res['code'] == 1) {
            this.resumesArray = res['data'];
          }
        })
      }
    })
  }
}
