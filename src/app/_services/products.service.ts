import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObjectIdExtended } from 'bson';
const PROD_API = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  public search = new BehaviorSubject<string>("")
  
  constructor(private http: HttpClient) { }

 getAllcategories():Observable<any>{
   return this.http.get(PROD_API + '/categories')
 }

  products(cat:any): Observable<any>{

    if(cat){
      return this.http.get(PROD_API + '/products?category=' + cat)
    }
    return this.http.get(PROD_API + '/products')
  }

  // getMobilesCategory(): Observable<any>{
  //   return this.http.get(PROD_API + '/mobiles')
  // }
  // getWatchesCategory(): Observable<any>{
  //   return this.http.get(PROD_API + '/watches')
  // }
  // getBooksCategory(): Observable<any>{
  //   return this.http.get(PROD_API + '/books')
  // }

  addToCart(payload: any){
    return this.http.post(PROD_API + '/addToCart',payload)
  }
 
 

  getFromCart(): Observable<any>{
    return this.http.get(PROD_API+ '/getFromCart')
    
  }

  increaseQty(payload:any) {
    return this.http.post(PROD_API +'/addToCart', payload);
  }
  // emptyCart() {
  //   return this.http.delete(`${environment.baseURL}/cart/empty-cart`);
  // }



  // public getData(pageNumber: number, pageSize: number) {
  //   return this.http.get(`https://jsonplaceholder.typicode.com/photos?_start=${pageNumber}&_limit=${pageSize}`);
  // }
    getData(page: number, size: number): Observable<any> {
     return this.http.get(PROD_API + `/products?pageNumber=${page}&size=${size}` );
   }
}
