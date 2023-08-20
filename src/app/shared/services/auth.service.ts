import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ApiPath } from '../utils/api-path';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

type LoginResponse = {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
  ) { }

  register(user: User): Observable<void> {
    return this.http.post<void>(environment.apiUrl + ApiPath.REGISTER, user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + ApiPath.LOGIN, user);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isValidToken(this.tokenService.getToken());
  }

  hasRole(role: string): boolean {
    const token = this.tokenService.getToken()
    if (this.isAuthenticated() && token) {
      const decodedToken = this.tokenService.decodeToken(token);
      return decodedToken.role === role;
    }
    return false;
  }
 
}
