import {Injectable} from '@angular/core';
import {IUser} from "../interfaces/IUser";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public errors = {email: '', username: '', password: '', passwordConfirm: ''}
  public userInput: IUser = {email: '', username: '', password: '', passwordConfirm: ''}
  private readonly pwRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
  private readonly emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

  constructor(private readonly http: HttpClient) { }

  validate() {
    this.errors.username = ''
    this.errors.password = ''
    this.errors.passwordConfirm = ''
    this.errors.email = ''
    let counter = 0

    if(!this.userInput.email!.match(this.emailRegex)) {
      this.errors.email = 'Email is invalid'
      counter++
    }
    if (this.userInput.username.length < 4) {
      this.errors.username = 'Invalid username'
      counter++
    }
    if (!this.userInput.password.match(this.pwRegex)) {
      this.errors.password = 'Invalid password'
      counter++
    }
    if (this.userInput.passwordConfirm !== this.userInput.password) {
      this.errors.passwordConfirm = 'Passwords do not match'
      counter++
    }
    return counter
  }

  saveRegisterInput() {
    if (this.validate() > 0)
      return

    const {passwordConfirm, ...user} = this.userInput
    this.registerUser(user).subscribe()
    this.userInput.username = ''
    this.userInput.email = ''
    this.userInput.password = ''
    this.userInput.passwordConfirm = ''
  }

  saveLoginInput() {
    const {passwordConfirm,email, ...user} = this.userInput
    this.loginUser(user).subscribe()
    this.userInput.username = ''
    this.userInput.password = ''
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  registerUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/auth/register`, user)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/auth/login`, user)
      .pipe(catchError(this.handleError));
  }

}
