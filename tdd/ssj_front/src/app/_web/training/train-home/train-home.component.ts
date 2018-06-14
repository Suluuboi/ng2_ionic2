import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-train-home',
  templateUrl: './train-home.component.html',
  styleUrls: ['./train-home.component.css']
})
export class TrainHomeComponent implements OnInit {

  public course = [
    {name: '培训课程名称1', courseId: 1, src: './assets/com-images/px/2.jpg', _houre: '12', people: 123, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称3', courseId: 1, src: './assets/com-images/px/3.jpg', _houre: '58', people: 146, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称4', courseId: 1, src: './assets/com-images/px/4.jpg', _houre: '32', people: 253, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称5', courseId: 1, src: './assets/com-images/px/5.jpg', _houre: '58', people: 367, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称6', courseId: 1, src: './assets/com-images/px/6.jpg', _houre: '45', people: 190, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称7', courseId: 1, src: './assets/com-images/px/7.jpg', _houre: '88', people: 184, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/8.jpg', _houre: '235', people: 12, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/9.jpg', _houre: '13', people: 67, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/10.jpg', _houre: '12', people: 101, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/11.jpg', _houre: '3', people: 140, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/12.jpg', _houre: '65', people: 79, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'},
    {name: '培训课程名称-test', courseId: 1, src: './assets/com-images/px/13.jpg', _houre: '76', people: 95, _des: 'Java作为面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。'}
  ];
  constructor() { }

  ngOnInit() {
    
  }
  getSearchValue(value){
    
  }

}
