import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './pages/content-page/content.component';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import {InputTextModule} from "primeng/inputtext";
import { LoginComponent } from './pages/login/login.component';
import {TableModule} from "primeng/table";
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HomePageComponent,
    PageNotFoundComponent,
    LeaderboardComponent,
    RegistrationComponent,
    LoginComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                },
            }
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
