import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from "jwt-decode";

type JwtPayloadWithRole = JwtPayload & { role: string };

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
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  public removeToken() {
    if (localStorage.getItem(this.TOKEN_NAME)) {
      localStorage.removeItem(this.TOKEN_NAME);
    }
  }

  public decodeToken(token: string): JwtPayloadWithRole {
    return jwtDecode<JwtPayloadWithRole>(token);
  }

  public isValidToken(token: string | null): boolean {
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

  private isNotExpired(token: JwtPayloadWithRole): boolean {
    const currentUnixTime = Math.round(Date.now() / 1000);
    return token.exp! > currentUnixTime;
  }

}
