import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialDesignModule} from './material-design/material-design.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialDesignModule
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }
