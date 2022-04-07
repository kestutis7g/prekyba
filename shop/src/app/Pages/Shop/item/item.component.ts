import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Cart, Item } from 'src/types/shop.types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item | undefined
  quantity: number = 1
  canEdit: boolean = false;

  addedToCart: boolean = false;
  QuantityInCart: number = 0;
  cartList?: Cart[];
  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    let route = this.activatedRoute.params.subscribe(params => {

      this.itemService.getItemById(params['id']).subscribe({
        next: (data) => {
          this.item = data;

        },
        error: (error) => {
          console.log(error);
        }}
      )
    });

    if (localStorage.getItem('type') == "admin" || localStorage.getItem('type') == "seller") {
      this.canEdit = true;
    }
    else {
      this.canEdit = false;
    }
  }

  getCartList(){

    this.cartService.getCartListByUserId(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe({
        next: (data) => {
          this.cartList = data;

          this.addedToCart = data.findIndex(x => x.itemId === this.item?.id) !== -1;
          console.log("ce toke nesamone", this.item);

        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  addToCart(id: number) {
    if (this.quantity > 0) {

      let cartItem: Cart = {
        id: 0,
        itemId: id,
        userId: parseInt(localStorage.getItem('userId') || "0"),
        quantity: this.quantity
      }

      this.cartService.addItemToCart(cartItem).subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
    }
  }

  pushButton(id: number) {
    this.route.navigate(["edit-item/" + id]);
  }

}
