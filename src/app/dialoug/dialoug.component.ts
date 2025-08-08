import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'; 
@Component({
  selector: 'app-dialoug',
  templateUrl: './dialoug.component.html',
  styleUrls: ['./dialoug.component.css']
})
export class DialougComponent {
  event: FormGroup;
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<DialougComponent>){
      this.event=this.fb.group({
    Title:['',Validators.required],
    Start:['',Validators.required],
    End:['',Validators.required]
  });
 
  }
  onSubmit(){
   if(this.event.valid){
    this.dialogRef.close(this.event.value)
   }
  }

  onCancel(){
    this.dialogRef.close()
  }
}
