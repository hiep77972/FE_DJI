import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly url='https://localhost:44399/';

  constructor(private http:HttpClient) { }



  getProductCategories():Observable<any[]>{
    return this.http.get<any>(this.url+'get-productcategories');
  }
  addUsers(val:any):Observable<any[]>{
    return this.http.post<any>(this.url+'add-users',val);
  }
  getUsers(val:any):Observable<any[]>{
    return this.http.post<any>(this.url+'get-users',val);
  }

  getProducts():Observable<any[]>{
    return this.http.get<any>(this.url+'get-products');
  }

  getDeTailProduct(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'get-product_by_id?id='+id);
  }

  addCarts(val:any):Observable<any[]>{
    return this.http.post<any>(this.url+'add-carts',val);
  }
  getCountCart(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'get-count-carts?id='+id);
  }
  getIsCart(idu:number,idp:number):Observable<any[]>{
    return this.http.get<any>(this.url+'is_carts?userid='+idu+'&productid='+idp);
  }
  getCart(id:number):Observable<any[]>{
      return this.http.get<any>(this.url+'get-carts?id='+id);
  }
  deleteCart(id:number){
    return this.http.delete(this.url+'delete-carts?id='+id);
  }

  deleteAllCart(id:number){
    return this.http.delete(this.url+'delete-all-carts?id='+id);
  }
  getIsOrder(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'is_orders?id='+id);
  }
  getOrder(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'get-orders?id='+id);
  }
  getOrderDetail(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'get-orderdetails?id='+id);
  }

  addOrders(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'add-orders?id='+id);
  }

  addOrderDetails(val:any):Observable<any[]>{
    return this.http.post<any>(this.url+'add-orderdetails',val);
  }
  updateCart(val:any){
    return this.http.put(this.url+'update-carts',val);
  }
  getUserOrder(id:number):Observable<any[]>{
    return this.http.get<any>(this.url+'get-user-order?id='+id);
  }
  updateOrder(val:any){
    return this.http.put(this.url+'update-orders',val);
  }
  addContact(val:any):Observable<any[]>{
    return this.http.post<any>(this.url+'add-contacts',val);
  }
  getProductByName(name:string):Observable<any[]>{
    return this.http.get<any>(this.url+'get-product-by-name?name='+name);
  }
  getProductByCategory():Observable<any[]>{
    return this.http.get<any>(this.url+'search-product-by-category');
  }
}
