import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getRouteDefaults(){
    return of({
      id : 0,
      dispatchDate: "",
      deliveryDate: "",
      orderNumber: 0,
      addressId:0,
      userId: 0
    } as Route)

  }

  getRouteList(): Observable<Route[]> {
    return this.http.get<Route[]>(this.APIUrl + 'Route');
  }

  getRouteByOrderNumber(number: number): Observable<Route> {
    return this.http.get<Route>(this.APIUrl + 'Route/' + number);
  }

  addRoute(route: Route) {
    return this.http.post(this.APIUrl + 'Route', route);
  }

  updateRoute(route: Route) {
    return this.http.put(this.APIUrl + 'Route', route);
  }

  deleteRouteFromList(id: number) {
    return this.http.delete(this.APIUrl + 'Route/' + id);
  }
}
