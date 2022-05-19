import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Cart, Item } from 'src/model/shop.types';


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
  cartList?: Cart[];
  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    let route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id){
        return;
      }

      this.itemService.getItemById(id).subscribe({
        next: (data) => {
          this.item = data;
          this.getCartList();
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

        },
        error: (error) => {
          console.log(error);
        }
      });
  }



  addToCart(itemId?: number) {
    if(!itemId){
      return;
    }
    if (this.quantity <= 0 || this.item!.quantity! <= this.quantityInCart(this.item!.id)) {
      return;
    }

    let cartItem: Cart = {
      id: 0,
      itemId: itemId,
      userId: parseInt(localStorage.getItem('userId') || "0"),
      quantity: this.quantity
    }

    this.cartService.addItemToCart(cartItem).subscribe(
      data => {
        this.getCartList();
      },
      error => {
        console.log(error);
      }
    );
  }

  removeFromCart(itemId?: number) {
    if(!itemId){
      return;
    }
    if (this.quantityInCart(itemId) > 1) {
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
  }

  quantityInCart(itemId?: number) {
    if(!itemId){
      return 0;
    }
    for (let i = 0; i < this.cartList!.length; i++) {
      if (this.cartList?.[i].itemId == itemId) {
        return this.cartList?.[i].quantity;
      }
    }
    return 0;
  }

  pushButton(id: number) {
    this.route.navigate(["edit-item/" + id]);
  }

}
