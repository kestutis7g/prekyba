import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from 'src/model/shop.types';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getAddressDefaults(){
    return of({
      city: '',
      street: '',
      building: 0,
      apartment: 0,
      zipCode: 0,
    } as Address);

  }

  getAddressList(): Observable<Address[]> {
    return this.http.get<Address[]>(this.APIUrl + 'Address');
  }

  getAddressById(id: string): Observable<Address> {
    return this.http.get<Address>(this.APIUrl + 'Address/' + id);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.APIUrl + 'Address', address);
  }

  updateAddress(address: Address) {
    return this.http.put(this.APIUrl + 'Address', address);
  }

  deleteAddressFromList(id: string) {
    return this.http.delete(this.APIUrl + 'Address/' + id);
  }
}
