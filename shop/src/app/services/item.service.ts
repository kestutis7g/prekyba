import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from 'src/types/shop.types';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getItemDefaults(){
    return of({
      id : 0,
      name : "",
      picture : "",
      price : null,
      description : "",
      quantity : null,
      discount : null,
      type : ""
    } as Item)

  }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.APIUrl + 'Item');
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(this.APIUrl + 'Item/' + id);
  }

  getItemListByUserId(userId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.APIUrl + 'Item/list/' + userId);
  }

  addItem(item: Item) {
    return this.http.post(this.APIUrl + 'Item', item);
  }

  updateItem(item: Item) {
    return this.http.put(this.APIUrl + 'Item', item);
  }

  deleteItemFromList(id: number) {
    return this.http.delete(this.APIUrl + 'Item/' + id);
  }
}
