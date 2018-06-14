import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtmlPipe'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}
  transform(html:string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
