import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';
import { Cart, Item } from 'src/types/shop.types';
import { ItemService } from 'src/app/services/item.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  displayedColumns = ['name']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList?: Item[];
  cartList?: Cart[];
  addedToCart!: boolean[];
  isVisible: boolean = true;

  constructor(private itemService: ItemService, private cartService: CartService,
    private route: Router) { }

  ngOnInit(): void {
    this.itemService.getItemList()
      .subscribe({
        next: (data) => {
          this.itemList = data;
          this.getCartList();
        },
        error: (error) => {
          console.log(error);
        }}
      );
  }

  getCartList(){

    this.cartService.getCartListByUserId(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe({
        next: (data) => {
          this.cartList = data;


          this.addedToCart = new Array<boolean>();
          for (let i = 0; i < this.itemList!.length; i++) {
            let added: boolean;
            added = false;
            for (let c = 0; c < this.cartList!.length; c++) {

              if (this.itemList![i].id == this.cartList![c].itemId) {
                added = true;
              }
            }
            this.addedToCart?.push(added);
          }
          console.log(this.addedToCart);

        },
        error: (error) => {
          console.log(error);
        }
      });
  }



  Refresh() {
    window.location.reload();
  }

  OpenItemWindow(id: number) {
    console.log(id);
    this.route.navigate(["item/" + id]);
  }

  AddToCart(itemId: number) {

    let cartItem: Cart = {
      id: 0,
      itemId: itemId,
      userId: parseInt(localStorage.getItem('userId') || "0"),
      quantity: 1
    }

    this.cartService.addItemToCart(cartItem).subscribe(
      data => {
        this.getCartList();
      },
      error => {
        console.log(error);
      }
    );
    //this.Refresh();
  }

  RemoveFromCart(itemId: number) {

    if (this.QuantityInCart(itemId) > 1) {
      let cartItem: Cart = {
        id: 0,
        itemId: itemId,
        userId: parseInt(localStorage.getItem('userId') || "0"),
        quantity: -1
      }

      this.cartService.addItemToCart(cartItem).subscribe(
        data => {
          this.getCartList();
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      for (let i = 0; i < this.cartList!.length; i++) {
        if (this.cartList?.[i].itemId == itemId) {
          this.cartService.deleteItemFromCart(this.cartList?.[i].id).subscribe(
            data => {
              this.getCartList();
            },
            error => {
              console.log(error);
            }
          );
          break;
        }
      }

    }
    //this.Refresh();
  }

  QuantityInCart(itemId: number) {
    for (let i = 0; i < this.cartList!.length; i++) {
      if (this.cartList?.[i].itemId == itemId) {
        return this.cartList?.[i].quantity;
      }
    }
    return 0;
  }

}
