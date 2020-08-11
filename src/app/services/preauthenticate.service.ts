import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreauthenticateService {
  
  constructor(
    private injector: Injector,
    private loginService: LoginService
  ) { }

  public get router(): Router {
    return this.injector.get(Router);
  }

  public checkToken() {
    if (localStorage.getItem('token')) {
      if (!this.loginService.isTokenExpired()) {
        this.loginService.changeCurrentUserValueInit()
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['']);
          },
          () => {
            this.router.navigate(['']);
          });
      } else {
        alert('Session expired.');
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }
    }
  }
}
