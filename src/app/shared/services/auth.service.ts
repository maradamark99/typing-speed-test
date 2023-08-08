import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ApiPath } from '../utils/api-path';
import { Observable } from 'rxjs';

type LoginResponse = {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private readonly http: HttpClient,
  ) { }

  register(user: User): Observable<void> {
    return this.http.post<void>(environment.apiUrl + ApiPath.REGISTER, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + ApiPath.LOGIN, user);
  }


}
