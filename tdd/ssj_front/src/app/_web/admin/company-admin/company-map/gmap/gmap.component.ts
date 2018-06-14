import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'gd-map',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnChanges, OnInit {

  @Input()
  center;
  public _center = [104.065753, 30.657477];
  @Input() searchMarks;
  public marks = [];
  @Output()
  position:EventEmitter<any> = new EventEmitter();
  // 弹出信息窗口定位
  infoWindowOffset = {
    x: 0,
    y: -30
  };
  constructor() { }
  ngOnChanges(){
    this.marks = [];
    if(this.center){
      this._center = [this.center.lng, this.center.lat];
      this.marks.push(this._center);
    }
    if(this.searchMarks.length != 0){
      this.searchMarks.forEach( el => {
        let _location = el.location.split(',');
        this.marks.push(_location);
      });
      this._center = this.marks[0];
    }
  }
  ngOnInit() {
    
  }
  onMapClick(e){
    this.marks = [];
    let _lnglat = e.lnglat;
    this._center = [_lnglat.lng, _lnglat.lat];
    this.marks.push(this._center);
    this.position.emit(this._center);
  }
  onMarkerClick(e, i){
    this._center = [e.lnglat.lng, e.lnglat.lat];
    this.position.emit(this.marks[i]);
  }
}