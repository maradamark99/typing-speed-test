import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from "jwt-decode";

 
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_NAME = "access_token";

  constructor() { }

  public getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public setToken(token: string) {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(token));
  }

  public removeToken() {
    if (localStorage.getItem(this.TOKEN_NAME)) {
      localStorage.removeItem(this.TOKEN_NAME);
    }
  }

  public decodeToken(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  public isValidToken(token: string): boolean {
    if (token) {
      try {
        const decodedToken = this.decodeToken(token);
        return this.isNotExpired(decodedToken);
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  private isNotExpired(token: JwtPayload): boolean {
    return token.exp! > Date.now();
  }
  
}
