import { Component, OnInit } from '@angular/core';
import {CalendarEvent,CalendarView} from 'angular-calendar'
import {addDays,addWeeks,addMonths,startOfDay,endOfDay} from 'date-fns'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-schedular';
  view:CalendarView=CalendarView.Month;
  CalendarView=CalendarView;

  viewDate:Date=new Date();
  //This is an predifned in the angular-calendar library to add any event in the calendar
  events:CalendarEvent[]=[
    {
      start:new Date(2025,7,7,10,0),
      end:new Date(2025,7,7,12,0),
      title:'Dr.Smit Patient A'
    },
    {
      start:new Date(2025,8,8,13,10),
      end:new Date(2025,8,8,14,0),
      title:'Patient B'
    }
  ]

  //This Function is to set the view that wether we need the month,Week or Day View
  setView(view:CalendarView){
    this.view=view;
  }

  //This Function is mainly to get back to present day
  today(){
    this.viewDate=new Date();
  }
//this function is to move backward to any 
  // motnh week or day in the calendar where i am calling changeDate function and passing a value 1
  next(){
    this.viewDate=this.changeDate(+1);
  }

  //this function is to move backward to any 
  // motnh week or day in the calendar where i am calling changeDate function and passing a value -1
  previous(){
    this.viewDate=this.changeDate(-1);
  }

  //this function is mainlt to move forward and backword and any calendarView using a switch it will check the view first a
    //and acc to the view it will move forward and backword where addMonths,addWeeks,addDays will move forward 
  private changeDate(no:number):Date{
    switch(this.view){
      case CalendarView.Month:
        return addMonths(this.viewDate,no);
      case CalendarView.Week:
        return addWeeks(this.viewDate,no);
      case CalendarView.Day:
        return addDays(this.viewDate,no);
      default:
        return this.viewDate;
    }
  }
}
