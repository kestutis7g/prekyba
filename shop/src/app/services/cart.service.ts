import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from 'src/types/shop.types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  addItemToCart(cartItem: Cart) {
    return this.http.post(this.APIUrl + 'Cart', cartItem);
  }

  getCartListByUserId(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.APIUrl + 'Cart/' + userId);
  }

  deleteItemFromCart(id: number) {
    return this.http.delete(this.APIUrl + 'Cart/' + id);
  }
}
