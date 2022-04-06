import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['name']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

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
