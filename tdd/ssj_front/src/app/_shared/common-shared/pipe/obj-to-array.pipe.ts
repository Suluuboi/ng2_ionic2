import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objToArray'
})
export class ObjToArrayPipe implements PipeTransform {

  transform(obj: object): Array<any> {
    let arr = [];
    let i = 0;
    for(let key in obj){
      if(obj[key]){
        i++;
        for(let key in obj){
          arr.push(obj[key]);
        }
        return arr;
      }
      return arr;
    }
  }
}
