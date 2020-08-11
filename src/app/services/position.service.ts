import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPosition } from '../models/position.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getAll() {
      return <Observable<IPosition[]>> this.http.get<IPosition[]>(environment.url + `/positions`);
  }

  // getById(id: number) {
  //     return <Observable<ICategory>> this.http.get<ICategory>(environment.url + `/categories/${id}`);
  // }

  save(position: any) {
    return this.http.post(environment.url + '/positions/save', position);
  }

  delete(id: number) {
    return this.http.delete(environment.url + '/positions/' + id);
  }
}
