import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly AUTH_URL: string = "/api/v1/auth";

  registerUser(user: IUser) {
    return this.http.post<IUser>(`${environment.apiUrl}${this.AUTH_URL}/login`, user);
  }

  loginUser(user: IUser) {
    return this.http.post<IUser>(`${environment.apiUrl}${this.AUTH_URL}/login`, user);
  }
  
}
