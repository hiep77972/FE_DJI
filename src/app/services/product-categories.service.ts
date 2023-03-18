import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategories } from '../models/product-categories';
const url='http://localhost:61537/';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(private http:HttpClient) { }

  getProductCategories():Observable<Array<ProductCategories>>{
    return this.http.get<Array<ProductCategories>>('http://localhost:61537/get-productcategories?id=0');
  }
}
