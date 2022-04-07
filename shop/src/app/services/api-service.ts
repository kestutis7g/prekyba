import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

import { IUser } from 'src/types/IUser';
import { Cart, Item } from 'src/types/shop.types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }







  addUser(user: IUser) {
    return this.http.post(this.APIUrl + 'User', user);
  }

  getUserLogin(login: string) {
    return this.http.get<IUser>(this.APIUrl + 'User/' + login);
  }





}
