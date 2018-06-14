import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekChange'
})
export class WeekChangePipe implements PipeTransform {

  transform(value: number): any {
    let week = '';
    switch (value) {
      case 1:
        week = '星期一';
        break;
      case 2:
        week = '星期二';
        break;
      case 3:
        week = '星期三';
        break;
      case 4:
        week = '星期四';
        break;
      case 5:
        week = '星期五';
        break;
      case 6:
        week = '星期六';
        break;
      case 7:
        week = '星期日';
    }
    return week;
  }

}
