import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';
import { IndexLoginComponent } from '../index-login/index-login.component';
import { JobsInfoServiceService } from '../_zhaopin-service/jobs-info-service.service';

@Component({
  selector: 'jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.css']
})
export class JobsDetailComponent implements OnInit {

  // 显示简历列表 弹出层控制
  isResumeBox = false;
  isSendLoading = false;
  public resumes = [];//简历列表
  public resume_id; //简历id

  public job_id;
  public jobDetail;// 职位详情

  public collect_id;// 职位收藏 id

  constructor(
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private jobInfoService: JobsInfoServiceService
  ) { }

  ngOnInit() {
    // 获取当前职位详情
    this.activatedRoute.params.subscribe(params => {
      this.job_id = params['jobId'];
      this.getCurrentJobInfo();// 获取相似职位详情信息
    });
  }
  //  获取当前职位信息
  getCurrentJobInfo() {
    this.jobInfoService.getJobDetailInfo(this.job_id).then(res => {
      if (res['code'] === 1) {
        this.jobDetail = res['data'];
        this.jobInfoService.setTitle(this.jobDetail['name'] + '-' + this.jobDetail['company_status_text'] + '-' + this.jobDetail['company_name'])
      }
    })
  }
  // 收藏按钮样式更换
  collect = (id) => {
      if (this.jobDetail.is_collection == 0) {
        this.jobInfoService.collectPositionAdd({ job_id: id }).then(res => {
          if(res['code'] === 401){
            this.collect_id = id;
            this.showModalForLoginComponent();
          }else if (res['code'] === 1) {
              this.jobDetail.is_collection = 1;
              this.jobInfoService.showMessage('success', '职位收藏成功');
          }else {
            this.jobDetail.is_collection = 1;
            this.jobInfoService.showMessage('error', res['msg']);
          }
        })
      } else {
        // 取消收藏 
        this.jobInfoService.collectPositionDeleted({ job_id: id }).then(res => {
          if(res['code'] === 401){
            this.showModalForLoginComponent();
          }else if (res['code'] === 1) {
            this.jobDetail.is_collection = 0;
            this.jobInfoService.showMessage('success', '取消职位收藏成功');
          } else {
            this.jobInfoService.showMessage('error', '取消职位收藏失败');
          }
        })
      }
  }

  sendResume = (id) => {
    this.resume_id = null;
    this.jobInfoService.getResumesList().then(res => {
      if (res['code'] == 1) {
        this.resumes = res['data'];
        this.showModal();
      } else if (res['code'] === 401) {
        this.showModalForLoginComponent();
      } else if (res['code'] === 403) {
        this.jobInfoService.showMessage('error', res['msg']);
      }else if (res['code'] === 0) {
        this.jobInfoService.error({
          title: '投递失败',
          content: '请先创建个人简历',
          ok: () => {
            this.jobInfoService.navTo('/userAdmin/resume');
          }
        })
      }
    })
  }

  showModalForLoginComponent() {
    const subscription = this.modalService.open({
      title: '登录框',
      content: IndexLoginComponent,
      wrapClassName: 'login-box',
      footer: false,
      componentParams: {
        type : 'collect'
      }
    });
    subscription.subscribe(res=>{
      if(res === 'collect'){
        this.collect(this.collect_id);
      }
    })
  }
  
  showModal = () => {
    this.isResumeBox = true;
  }
  // 确认提交投递简历
  public error_msg = '';
  handleOk = (e) => {
    if (!this.resume_id) {
      this.jobInfoService.showMessage('warning', '请选择投递简历！');
      return false;
    }
    this.isSendLoading = true;
    let opt = {
      job_id: this.job_id,
      resume_id: this.resume_id
    }
    this.jobInfoService.deliveryResumeForJobs(opt).then(res => {
      if (res['code'] === 1) {
        this.isResumeBox = false;
        this.isSendLoading = false;
        this.jobDetail.is_exit = 1;
        this.jobInfoService.showMessage('success', '简历投递成功');
      } else {
        this.isSendLoading = false;
        let _data = res['data'];
        for (let i in _data) {
          for (let j in _data[i]) {
            this.error_msg += _data[i][j] + '!';
          }
        }
        this.error_msg = '简历投递失败!' + this.error_msg;
        this.jobInfoService.showMessage('error', this.error_msg);
      }
    })
    setTimeout(() => {
    }, 3000);
  }

  handleCancel = (e) => {
    this.isResumeBox = false;
  }
}
