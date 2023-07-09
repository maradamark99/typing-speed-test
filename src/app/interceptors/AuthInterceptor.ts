import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly TOKEN_PREFIX = "Bearer ";

    constructor(private readonly tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token && this.tokenService.isValidToken(token)) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    this.TOKEN_PREFIX + token)
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }

}
    
    