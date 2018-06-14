import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class VideoHomeComponent implements OnInit {

  public downLoads = [
    {icon: 'anticon anticon-compass', title: '启动助手', name: 'CloudLauncherV1.0.0.7.exe', link: 'http://tfjyw.cdtfhr.com/fm/download/CloudLauncherV1.0.0.7.exe'},
    {icon: 'anticon anticon-windows', title: 'windows版本', name: 'NetMeeting_Ent_WindowsV3.10.1.38.exe', link: 'http://tfjyw.cdtfhr.com/fm/download/NetMeeting_Ent_WindowsV3.10.1.38.exe'},
    {icon: 'anticon anticon-apple', title: 'MAC版本', name: 'NetMeeting_MacV3.12.4.6.dmg', link: 'http://tfjyw.cdtfhr.com/fm/download/NetMeeting_MacV3.12.4.6.dmg'},
    {icon: 'anticon anticon-android', title: 'Android', name: 'FastMeeting_Cloud_for_Android_fsmeeting_3.12.5.10.apk', link: 'http://tfjyw.cdtfhr.com/fm/download/FastMeeting_Cloud_for_Android_fsmeeting_3.12.5.10.apk'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
