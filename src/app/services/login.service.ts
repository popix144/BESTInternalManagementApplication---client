import { Injectable } from '@angular/core';
import { JwtResponse } from '../models/jwtResponse.interface';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }

  changeCurrentUserValueInit() {
    return this.httpClient.post(environment.url + `/users/token`, null)
    .pipe(
      map((response: any) => {
        if (response) {
          const instanceUser: JwtResponse = {
            user: response,
            jwtToken: localStorage.getItem('token')
          };
          this.currentUserSubject.next(instanceUser);
        }
        return response;
      })
    );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post(
        environment.url + `/authenticate`,
        // tslint:disable-next-line: object-literal-shorthand
        { email: email, password: password }
      )
      .pipe(
        map((response: JwtResponse) => {
          // login successful if there's a jwt token in the response
          if (response) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', response.jwtToken);
            const instanceUser: JwtResponse = {
              user: response.user,
              jwtToken: response.jwtToken
            };
            this.currentUserSubject.next(instanceUser);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = helper.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
