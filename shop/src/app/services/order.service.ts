import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getOrderDefaults(){
    return of({
      number: 0,
      date: "",
      sum: 0,
      discount: 0,
      comment: "",
      status: "",
      userId: 0
    } as Order)

  }

  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl + 'Order');
  }

  getOrderByNumber(number: number): Observable<Order> {
    return this.http.get<Order>(this.APIUrl + 'Order/' + number);
  }

  getOrderListByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl + 'Order/list/' + userId);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.APIUrl + 'Order', order);
  }

  updateOrder(order: Order) {
    return this.http.put(this.APIUrl + 'Order', order);
  }

  deleteOrderFromList(number: number) {
    return this.http.delete(this.APIUrl + 'Order/' + number);
  }
}
