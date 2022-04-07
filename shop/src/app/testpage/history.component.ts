import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Item } from 'src/model/shop.types';
import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['name']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList?: Item[];

  constructor(private itemService: ItemService,
    private route: Router) { }

  ngOnInit(): void {
    this.itemService.getItemList()
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
    this.route.navigate(["item", id]);
  }
}
