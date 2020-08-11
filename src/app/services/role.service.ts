import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../models/role.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll() {
      return <Observable<IRole[]>> this.http.get<IRole[]>(environment.url + `/roles`);
  }

  save(role: any) {
    return this.http.post(environment.url + '/roles/save', role);
  }

  delete(id: number) {
    return this.http.delete(environment.url + '/roles/' + id);
  }
}
