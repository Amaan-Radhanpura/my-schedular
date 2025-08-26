import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialougComponent } from './dialoug/dialoug.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DialougService {

  private Url='http://127.0.0.1:8000/get_events'

  constructor(private dialog:MatDialog,private http:HttpClient) { }
  openAddEventButton():Observable<event>{
    const  dialogRef=this.dialog.open(DialougComponent)
    return dialogRef.afterClosed()
  }

  fetchEvents():Observable<any>{
    return this.http.get<any>(this.Url)
  }

}

export interface event{
  Start:Date,
  End:Date,
  Title:string
  Reason:string
}
