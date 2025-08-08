import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialougComponent } from './dialoug/dialoug.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialougService {

  constructor(private dialog:MatDialog) { }
  openAddEventButton():Observable<event>{
    const  dialogRef=this.dialog.open(DialougComponent)
    return dialogRef.afterClosed()
  }

}

export interface event{
  Start:Date,
  End:Date,
  Title:string
}
