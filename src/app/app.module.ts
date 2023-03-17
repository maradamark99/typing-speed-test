import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { WordTypingComponent } from './home/word/word-typing.component';
import { StatComponent } from './home/stat/stat.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './auth/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './auth/login/login.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WordTypingComponent,
    StatComponent,
    RegistrationComponent,
    FormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
