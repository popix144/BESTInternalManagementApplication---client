import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getAll() {
      return <Observable<IUser[]>> this.http.get<IUser[]>(environment.url + `/users`);
  }

  getById(id: number) {
      return <Observable<IUser>> this.http.get<IUser>(environment.url + `/users/${id}`);
  }

  getByToken() {
      return <Observable<IUser>> this.http.get<IUser>(environment.url + `/users/token`);
  }

  update(user: IUser) {
    console.log(user.roles);
    return <Observable<IUser>> this.http.put(environment.url + `/users/` + user.id, 
    {
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      email: user.email,
      enabled: user.enabled,
      roles: user.roles
    });
  }
}
