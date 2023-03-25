import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategories } from '../models/product-categories';
const url='https://localhost:44399/';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(private http:HttpClient) { }

  getProductCategories():Observable<any[]>{
    return this.http.get<any>(url+'get-productcategories');
  }

}
