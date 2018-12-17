import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RatesComponent } from './rates/rates.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { CurrenciesComponent } from './currencies/currencies.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialDesignModule} from './material-design/material-design.module';

@NgModule({
  declarations: [
    AppComponent,
    RatesComponent,
    CurrenciesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialDesignModule
  ],
  providers: [RatesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
