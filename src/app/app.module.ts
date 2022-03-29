import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { ContentComponent } from './content.component';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
