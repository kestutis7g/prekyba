import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderItem } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getOrderItemDefaults(){
    return of({
      quantity : 0,
      orderNumber : "",
      itemId : ""
    } as OrderItem)

  }

  getOrderItemList(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.APIUrl + 'OrderItem');
  }

  getOrderItemListByOrderNumber(userId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.APIUrl + 'OrderItem/list/' + userId);
  }

  addOrderItem(orderItem: OrderItem) {
    return this.http.post(this.APIUrl + 'OrderItem', orderItem);
  }

  updateOrderItem(orderItem: OrderItem) {
    return this.http.put(this.APIUrl + 'OrderItem', orderItem);
  }

  deleteOrderItemFromList(id: string) {
    return this.http.delete(this.APIUrl + 'OrderItem/' + id);
  }
}
