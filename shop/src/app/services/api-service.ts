import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IParkingItem } from 'src/model/Parking/PendingChanges/IParkingItem';
import { environment } from 'src/environments/environment';
import { IParking } from 'src/model/Parking/PendingChanges/IParking';
import { Observable } from 'rxjs';
import { IParkingHistoryFilters } from 'src/model/Parking/History/IParkingHistoryFilters';
import { IParkingHistory } from 'src/model/Parking/History/IParkingHistory';
import { IParkingHistoryFilterOptions } from 'src/model/Parking/History/IParkingHistoryFilterOptions';
import { ISchedule } from 'src/model/Parking/Settings/ISchedule';
import { IItem } from 'src/model/IItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly APIUrl = environment.APIUrl;

  constructor(private http: HttpClient) { }

  getItemList(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.APIUrl + 'Item');
  }

  getItemById(id: number) {
    return this.http.get<IItem>(this.APIUrl + 'Item/' + id);
  }

  getParkingList(skip: number, pageSize: number) {
    return this.http.get<IParking>(this.APIUrl + 'parking');
  }

  uploadParkingData(parkingList: IParkingItem[]) {
    return this.http.post(this.APIUrl + 'parking', parkingList);
  }

  resetParkingData() {
    return this.http.delete(this.APIUrl + 'parking');
  }

  getParkingHistory(skip: number, pageSize: number, filters: IParkingHistoryFilters) {
    let params = new HttpParams()
      .set("skip", skip)
      .set("pageSize", pageSize)

    if (filters.condition != "All") {
      params = params.append("condition", filters.condition);
    }

    if (filters.tableName.length > 0) {
      filters.tableName.forEach(item => {
        params = params.append("tableName", item);
      });
    }

    if (typeof filters.phoneNumber != 'undefined' && filters.phoneNumber) {
      params = params.append("phoneNumber", filters.phoneNumber);
    }

    if (typeof filters.comment != 'undefined' && filters.comment) {
      params = params.append("comment", filters.comment);
    }

    return this.http.get<IParkingHistory>(this.APIUrl + 'parking/history', { params: params });
  }

  clearParkingHistory() {
    return this.http.delete(this.APIUrl + 'parking/history');
  }

  getParkingHistoryFilterOptions() {
    return this.http.get<IParkingHistoryFilterOptions>(this.APIUrl + 'parking/history/filter');
  }

  getParkingSchedule() {
    return this.http.get<ISchedule>(this.APIUrl + 'parking/schedule/' + 1)
  }

  updateParkingSchedule(schedule: ISchedule) {
    return this.http.put(this.APIUrl + 'parking/schedule/' + 1, schedule)
  }
}
