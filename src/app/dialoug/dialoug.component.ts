import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialoug',
  templateUrl: './dialoug.component.html',
  styleUrls: ['./dialoug.component.css']
})
export class DialougComponent {
  event: FormGroup;
  constructor(private fb:FormBuilder){
      this.event=this.fb.group({
    name1:['',Validators.required],
    date:['',Validators.required]
  })
 
  }
  onSubmit(){
    console.log(this.event.value)
  }

}
