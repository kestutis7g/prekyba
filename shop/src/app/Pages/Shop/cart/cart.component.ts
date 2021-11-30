import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { ICart } from 'src/model/ICart';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDisplayedColumns = ['userId', 'itemId', 'quantity']
  displayedColumns = ['name', 'price', 'quantity', 'discount', 'type']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList?: IItem[];
  cartList?: ICart[];

  constructor(private service: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.service.getCartListById(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe(
        data => {
          this.cartList = data;
          console.log(this.cartList);
        },
        error => {
          console.log(error);
        }
      );

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
