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
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; 
import { WordTypingComponent } from './home/word/word-typing.component';
import { StatComponent } from './home/stat/stat.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './auth/form/form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './auth/login/login.component';
import { EndResultDialogComponent } from './home/end-result-dialog/end-result-dialog.component';
import { AuthInterceptor } from './shared/interceptors/AuthInterceptor';
import { ResultComponent } from './result/result.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadedDirective } from './shared/directives/loaded-directive';
import { SortHeaderComponent } from './shared/components/sort-header/sort-header.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WordTypingComponent,
    StatComponent,
    RegistrationComponent,
    FormComponent,
    LoginComponent,
    EndResultDialogComponent,
    ResultComponent,
    LoadingComponent,
    LoadedDirective,
    SortHeaderComponent,
    PaginatorComponent,
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
    MatDialogModule,
    MatSortModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
