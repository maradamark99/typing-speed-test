import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ContentComponent} from "./pages/content-page/content.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LeaderboardComponent} from "./pages/leaderboard/leaderboard.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'content', component: ContentComponent },
  { path: 'leaderboard', component: LeaderboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
