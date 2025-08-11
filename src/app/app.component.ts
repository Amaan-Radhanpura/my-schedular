import { Component, OnInit } from '@angular/core';
import {CalendarEvent,CalendarView} from 'angular-calendar'
import {addDays,addWeeks,addMonths,startOfDay,endOfDay} from 'date-fns'
import { DialougComponent } from './dialoug/dialoug.component';
import { MatDialog } from '@angular/material/dialog';
import { DialougService } from './dialoug.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-schedular';
  view:CalendarView=CalendarView.Month;
  CalendarView=CalendarView;
constructor(private service :DialougService){}
  viewDate:Date=new Date();
  list:boolean=false;
  displayedColumns=['Title','Start','End']
  filteredData=[]
  //This is an predifned in the angular-calendar library to add any event in the calendar
  events:CalendarEvent[]=[
    {
      start:new Date(2025,7,7,10,0),
      end:new Date(2025,7,7,1,0),
      title:'Patient A'
      
    },
    {
      start:new Date(2025,8,8,13,10),
      end:new Date(2025,8,8,14,0),
      title:'Patient B'
    }
  ]

  
  ngOnInit(): void {
    this.events = JSON.parse(localStorage.getItem('event'));
    this.filteredData=this.events
  }


   monthEvents() {
    return this.events.map(e => {
    let start = new Date(e.start);
    let end = new Date(e.end);
 
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }
 
    return {
      ...e,
      start,
      end
    };
  });
  }

  //This Function is to set the view that wether we need the month,Week or Day View
  setView(view:CalendarView){
    this.view=view;
    this.list=false;
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
        this.list=false;
        return addMonths(this.viewDate,no);
      case CalendarView.Week:
        this.list=false;
        return addWeeks(this.viewDate,no);
      default:
        return this.viewDate;
    }
  }
  //
 //my this function is mainly used to fetch thae data what ever the service has and will send where all the neww added events
  //are getting added in the
  openAddEventDialog(){
    this.service.openAddEventButton().subscribe(data=>
    {
      if(data){
       this.events=[...this.events,{
         start:new Date(data.Start),
         end:new Date(data.End),
         title:data.Title      
       }]
       localStorage.setItem('event',JSON.stringify(this.events));
       console.log(this.events)
      }
    }
  )
  }

  listTable(){
    this.list=true;
    console.log(this.list);  
  }

  
  //Function to serarch based on Title
  searchText:string=''
  Title(event:any){
    if(event){
      this.searchText=event.target.value
      this.filteredData=this.events.filter(item=>item.title.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  }

  //Function to serarch based on Start
  search:Date=new Date()
  Start(event:any){
    console.log(event)
    if(event){
      this.search=event.target.value
      this.filteredData=this.events.filter(item=>item.start==this.search)
    }
  }

  End(event:any){
    console.log(event)
     if(event){
      this.search=event.target.value
      this.filteredData=this.events.filter(item=>item.end==this.search)
    }
  }

}
