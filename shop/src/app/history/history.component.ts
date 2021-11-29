import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';
import { PaginationModel } from 'src/model/PaginationModel';
import { IParkingHistory } from 'src/model/Parking/History/IParkingHistory';
import { IParkingHistoryFilterOptions } from 'src/model/Parking/History/IParkingHistoryFilterOptions';
import { IParkingHistoryFilters } from 'src/model/Parking/History/IParkingHistoryFilters';
import { IParkingHistoryItem } from 'src/model/Parking/History/IParkingHistoryItem';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  ParkingHistory?: IParkingHistory;
  ParkingHistoryList?: IParkingHistoryItem[];

  displayedColumns = ['name']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  pagination: PaginationModel = new PaginationModel();
  pageNumber?: number;

  historyfilterOptionsList?: IParkingHistoryFilterOptions;
  historyFilters: IParkingHistoryFilters =
    {
      condition: "All",
      tableName: [],
      phoneNumber: "",
      comment: ""
    }

  itemList?: IItem[];



  constructor(private service: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.service.getItemList()
      .subscribe(
        data => {
          this.itemList = data;
          console.log(this.itemList);
        },
        error => {
          console.log(error);
        }
      );

  }

  pushButton(id: number) {
    console.log(id);
    this.route.navigate(["item/" + id]);
  }




}
