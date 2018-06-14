import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnChanges, OnInit {
  public companyProfile: string;
  config = {
    filebrowserBrowseUrl: '&&&&&',
    filebrowserUploadUrl: '&&&'
  };
  @Input()
  content:string;
  @Output()
  editorContent:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(){
    this.companyProfile = this.content;
  }
  ngOnInit() {
    
  }
  onChange(value){
    this.editorContent.emit(value);
  };
}
