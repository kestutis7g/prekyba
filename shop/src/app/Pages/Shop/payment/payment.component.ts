import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/types/shop.types';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private route: Router,

  ) { }

  itemList: Item[] = [];

  ngOnInit(): void {
    this.itemService.getItemListByUserId(parseInt(localStorage.getItem('userId') || "0"))
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

  clearCart() {
    this.itemList.forEach(item => {
      this.cartService.deleteItemFromCart(item.id).subscribe(() => this.route.navigate(["/home"]));
    });

  }

}
