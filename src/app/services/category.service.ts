import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
      return <Observable<ICategory[]>> this.http.get<ICategory[]>(environment.url + `/categories`);
  }

  // getById(id: number) {
  //     return <Observable<ICategory>> this.http.get<ICategory>(environment.url + `/categories/${id}`);
  // }

  save(category: any) {
    return this.http.post(environment.url + '/categories/save', category);
  }

  delete(id: number) {
    return this.http.delete(environment.url + '/categories/' + id);
  }
}
