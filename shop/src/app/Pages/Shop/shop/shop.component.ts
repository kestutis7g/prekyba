import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';
import { ICart } from 'src/model/ICart';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  displayedColumns = ['name']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList?: IItem[];
  cartList?: ICart[];
  addedToCart!: boolean[];
  isVisible: boolean = true;

  constructor(private service: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.service.getItemList()
      .subscribe(
        data => {
          this.itemList = data;

          this.service.getCartListByUserId(parseInt(localStorage.getItem('userId') || "0"))
            .subscribe(
              data => {
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
              error => {
                console.log(error);
              }

            );
        },
        error => {
          console.log(error);
        }
      );
  }

  Refresh() {
    window.location.reload();
  }

  OpenItemWindow(id: number) {
    console.log(id);
    this.route.navigate(["item/" + id]);
  }

  AddToCart(itemId: number) {

    let cartItem: ICart = {
      id: 0,
      itemId: itemId,
      userId: parseInt(localStorage.getItem('userId') || "0"),
      quantity: 1
    }

    this.service.addItemToCart(cartItem).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    );
    this.Refresh();
  }

  RemoveFromCart(itemId: number) {

    if (this.QuantityInCart(itemId) > 1) {
      let cartItem: ICart = {
        id: 0,
        itemId: itemId,
        userId: parseInt(localStorage.getItem('userId') || "0"),
        quantity: -1
      }

      this.service.addItemToCart(cartItem).subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      for (let i = 0; i < this.cartList!.length; i++) {
        if (this.cartList?.[i].itemId == itemId) {
          this.service.deleteItemFromCart(this.cartList?.[i].id).subscribe(
            data => {

            },
            error => {
              console.log(error);
            }
          );
          break;
        }
      }

    }
    this.Refresh();
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
