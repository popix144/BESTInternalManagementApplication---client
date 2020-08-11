import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // console.log('jwtInterceptor');
        const currentUser = this.loginService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.jwtToken || localStorage.getItem('token');
        const isApiUrl = request.url.startsWith(environment.url);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(request);
    }
}