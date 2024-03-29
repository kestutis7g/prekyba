import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemBalance } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root'
})
export class ItemBalanceService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getItemBalanceDefaults(){
    return of({
      amount: 0,
      date: "",
      itemId: ""
    } as ItemBalance)

  }

  getItemBalanceList(): Observable<ItemBalance[]> {
    return this.http.get<ItemBalance[]>(this.APIUrl + 'ItemBalance');
  }

  getItemBalanceListByItemId(itemId: string): Observable<ItemBalance[]> {
    return this.http.get<ItemBalance[]>(this.APIUrl + 'ItemBalance/list/' + itemId);
  }

  addItemBalance(itemBalance: ItemBalance) {
    return this.http.post(this.APIUrl + 'ItemBalance', itemBalance);
  }

  updateItemBalance(itemBalance: ItemBalance) {
    return this.http.put(this.APIUrl + 'ItemBalance', itemBalance);
  }

  deleteItemBalanceFromList(id: string) {
    return this.http.delete(this.APIUrl + 'ItemBalance/' + id);
  }
}
