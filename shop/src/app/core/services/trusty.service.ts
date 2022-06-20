import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TrustyCreateUser, TrustyUser } from '../types/trusty.types';

@Injectable({
  providedIn: 'root',
})
export class TrustyService {
  constructor(private http: HttpClient) {}

  readonly API = environment.trustyApi;

  public register(user: TrustyCreateUser) {
    return this.http.post<TrustyUser>(`${this.API}/auth/register`, user);
  }
}
