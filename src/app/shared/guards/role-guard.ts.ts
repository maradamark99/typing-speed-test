import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
    
  constructor(public authService: AuthService, public router: Router) { }
    
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data['role'];
    if (!this.authService.hasRole(role)) {
      	this.router.navigate(['/']);
        return false;
      }   
    return true;
  }
    
}