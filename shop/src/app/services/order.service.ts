import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) {}

  getOrderDefaults() {
    return of({
      date: '',
      sum: 0,
      discount: 0,
      comment: '',
      status: '',
      userId: '',
    } as Order);
  }

  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl + 'Order');
  }

  getOrderByNumber(number: string): Observable<Order> {
    return this.http.get<Order>(this.APIUrl + 'Order/' + number);
  }

  getOrderListByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.APIUrl + 'Order/list/' + userId);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.APIUrl + 'Order', order);
  }

  updateOrder(order: Order) {
    return this.http.put(this.APIUrl + 'Order', order);
  }

  deleteOrderFromList(number: string) {
    return this.http.delete(this.APIUrl + 'Order/' + number);
  }
}
