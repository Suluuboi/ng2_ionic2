import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-date-picker',
  templateUrl: './user-date-picker.component.html',
  styleUrls: ['./user-date-picker.component.css']
})
export class UserDatePickerComponent implements OnInit {

  public _startDate = null;
  public _endDate = null;

  @Input()
  set defaultDate(value) {
    // 将默认值初始化
    this._startDate = null;
    this._endDate = null;
    // 判断是否有传递参数过来，如果有，则设置为默认值；
    if (value.start_time != null) {
      this._startDate = new Date(value.start_time);
    }
    if (value.end_time != null) {
      this._endDate = new Date(value.end_time);
    }
  }
  public workDateTime = { _startDate: '', _endDate: '' };
  @Output("workDate")
  dateTime: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
    this.workDateTime['_startDate'] = this._startDate;
    this.workDateTime['_endDate'] = this._endDate;
    this.dateTime.emit(this.workDateTime);
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
    this.workDateTime['_startDate'] = this._startDate;
    this.workDateTime['_endDate'] = this._endDate;
    this.dateTime.emit(this.workDateTime);
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };
  get _isSameDay() {
    return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
  }
  get _endTime() {
    return {
      nzHideDisabledOptions: true,
      nzDisabledHours: () => {
        return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
      },
      nzDisabledMinutes: (h) => {
        if (this._isSameDay && h === this._startDate.getHours()) {
          return this.newArray(this._startDate.getMinutes());
        }
        return [];
      },
      nzDisabledSeconds: (h, m) => {
        if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
          return this.newArray(this._startDate.getSeconds());
        }
        return [];
      }
    }
  }
}
