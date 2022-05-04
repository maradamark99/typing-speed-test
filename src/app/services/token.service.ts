import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenService{
  constructor(private readonly router: Router, private readonly jwtHelper: JwtHelperService){}

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }

  getDecodedToken(){
    return this.jwtHelper.decodeToken(this.getToken()!);
  }

  checkToken(): boolean{
    const token = this.getDecodedToken()
    if(!token || this.jwtHelper.isTokenExpired(this.getToken()!))
    {
      this.router.navigate(['/login']).then()
      return false
    }
    return true
  }
}


