import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: IUser) {
    // TODO: handle error
    return this.http.post<IUser>(environment.apiUrl + '/api/v1/auth/register', user);
  }
}
