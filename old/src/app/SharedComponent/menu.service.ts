import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getCategories(): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/admin/category');
  }
}
