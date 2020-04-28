import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonsComponent } from './persons/persons.component';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {Person_detailComponent } from './person_detail/person_detail.component';
import {Moment} from 'moment';
import {saveAs} from 'file-saver';
import {
   MAT_MOMENT_DATE_FORMATS,
   MomentDateAdapter,
   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
 } from '@angular/material-moment-adapter';
 import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
   declarations: [
      AppComponent,
      PersonsComponent,
      Person_detailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      DemoMaterialModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      //set locale to japan
      {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
      {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
