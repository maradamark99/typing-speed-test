import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { ApiPath } from '../utils/api-path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  registerUser(user: IUser) {
    return this.http.post<IUser>(environment.apiUrl + ApiPath.REGISTER, user);
  }

  loginUser(user: IUser) {
    return this.http.post<IUser>(environment.apiUrl + ApiPath.LOGIN, user);
  }
  
}
