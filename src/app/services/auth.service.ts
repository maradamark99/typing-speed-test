import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
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

  register(user: IUser): Observable<void> {
    return this.http.post<void>(environment.apiUrl + ApiPath.REGISTER, user);
  }

  login(user: IUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + ApiPath.LOGIN, user);
  }


}
