import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule, RecurrenceEditorModule,DayService,WeekService,MonthService } from '@syncfusion/ej2-angular-schedule';
import {CalendarModule,DateAdapter} from 'angular-calendar'
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatGridListModule} from '@angular/material/grid-list';
import { DialougComponent } from './dialoug/dialoug.component'
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'; 

@NgModule({
  declarations: [
    AppComponent,
    DialougComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule, RecurrenceEditorModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide:DateAdapter,
      useFactory:adapterFactory
    }),
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [DayService,WeekService,MonthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
