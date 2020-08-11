import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NewUser } from '../models/newUser.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(newUser: NewUser) {
    return this.httpClient.post(environment.url + `/register`, newUser);
  }
}
