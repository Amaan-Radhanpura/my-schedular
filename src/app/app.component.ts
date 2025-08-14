import { Component, OnInit } from '@angular/core';
import {CalendarEvent,CalendarView} from 'angular-calendar'
import {addDays,addWeeks,addMonths,startOfDay,endOfDay} from 'date-fns'
import { DialougComponent } from './dialoug/dialoug.component';
import { MatDialog } from '@angular/material/dialog';
import { DialougService } from './dialoug.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-schedular';
  view:CalendarView=CalendarView.Month;
  CalendarView=CalendarView;
constructor(private service :DialougService,private snack:MatSnackBar){}
  viewDate:Date=new Date();
  list:boolean=false;
  displayedColumns=['Title','Start','End','Reason','Actions']
  filteredData=[]
  //This is an predifned in the angular-calendar library to add any event in the calendar
  events:calendarEvent[]=[]
  filter:string='All';
  Reasons:string[]=['All','Fever','Cough','HeadAche']
  
  ngOnInit(): void {
    if(this.events){
    this.events = JSON.parse(localStorage.getItem('event'));
  }
    this.filteredData=this.events

  }

  //This Function is mainly used when the data is fetched from localstorage is is returning date has string even after i am parsing it
  //due to which the events were not getting printed because they are not an date object and the error was getting printed in console
  //so to convert the string to date object this function does it where we use map which create a new array and a new object e of every events
  //and after that in start and end with the help of new date it converts the string to the javascript date object 
  //and then we return e where an spread operator is been used so that execpt start and end other values remain the same
   Events() {
    return this.events.map(e => {
    let start = new Date(e.start);
    let end = new Date(e.end);
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
        const today=new Date()
        today.setHours(0,0,0,0)
        const eventDate=new Date(data.Start)
        eventDate.setHours(0,0,0,0)
        if(eventDate<today){
          this.snack.open('Event cannot be added for previous dates','close')
          return;
        }

       this.events.push({
         start:new Date(data.Start),
         end:new Date(data.End),
         title:data.Title,
         Reason:data.Reason
       })
       localStorage.setItem('event',JSON.stringify(this.events));
      }
    }
  )
  }

  listTable(){
    this.list=true; 
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

  //Function to search based on End
  End(event:any){
    console.log(event)
     if(event){
      this.search=event.target.value
      this.filteredData=this.events.filter(item=>item.end==this.search)
    }
  }

  //Delete an Event 
  deleteEvent(index:number){
    this.events.splice(index,1);
    localStorage.setItem('event',JSON.stringify(this.events));
    this.filteredData=this.events
  }

  //Filter the data based on the Reason that has been entered
  Filter(reason:string){
    if(reason=='All'){
      this.filteredData=this.events
    }
    else {
      console.log(reason)
      this.filteredData=this.events.filter(item=>{
      return  item.Reason.includes(reason)
      })
      console.log(this.filteredData)
    }
  }
  
}

interface calendarEvent{
  start:Date,
  end:Date,
  title:string,
  Reason:string
}
