import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTime'
})
export class ShowTimePipe implements PipeTransform {

  transform(value: any): any {
    let showTime = ''; // 返回展示时间的格式
    let t = new Date(value);
    let now = new Date();
    let minus = (now.getTime() - t.getTime())/(1000*60*60*24);
    if(minus <= 1 && now.getDate() == t.getDate()){
      // 时间差小于1， 并且，获取的日期相同。所以为当天
      showTime = '今天';
    }else if(minus <= 2 && now.getDate() == t.getDate() + 1){
      showTime = '昨天';
    }else{
      showTime = this.dealDateWith(t);
    }
    return showTime;
  }
  // deal date toString
  dealDateWith(d) {
    return d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
  }

}
