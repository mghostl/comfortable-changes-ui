import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RatesComponent } from './rates/rates.component';
import {HttpClientModule} from '@angular/common/http';
import { CurrenciesComponent } from './currencies/currencies.component';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    RatesComponent,
    CurrenciesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [RatesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
