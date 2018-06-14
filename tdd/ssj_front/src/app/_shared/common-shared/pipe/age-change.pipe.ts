import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageChange'
})
export class AgeChangePipe implements PipeTransform {

  transform(value: any): any {
    let birthday = new Date(value);// 出生时间
    let now  = new Date();// 当前时间

    let t = now.getTime() - birthday.getTime();
    let age = Math.floor(t/(1000*60*60*24*365));
    return age;
  }
}
