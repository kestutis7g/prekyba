import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';

import { ItemService } from 'src/app/services/item.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart, Item } from 'src/model/shop.types';

interface Sort {
  value: string;
  viewValue: string;
}


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
  allItems?: Item[];
  cartList?: Cart[];
  addedToCart!: boolean[];
  isVisible: boolean = true;

  sortBy: Sort[] = [
    {value: 'price-up', viewValue: 'Kaina ↑'},
    {value: 'price-down', viewValue: 'Kaina ↓'},
    {value: 'discount-up', viewValue: 'Nuolaida ↑'},
    {value: 'discount-down', viewValue: 'Nuolaida ↓'},
  ];

  filter: Sort[] = [
    {value: 'Tranportas', viewValue: 'Transportas'},
    {value: 'Kompiuterija', viewValue: 'Kompiuterija'},
    {value: 'Komunikacija', viewValue: 'Komunikacija'},
    {value: 'Drabužiai', viewValue: 'Drabužiai'},
    {value: 'Technika', viewValue: 'Technika'},
    {value: 'Buitis', viewValue: 'Buitis'},
  ];


  constructor(private itemService: ItemService, private cartService: CartService,
    private route: Router) { }

  ngOnInit(): void {
    this.getItemList();
  }


  filterList(value: string){
    console.log(value);

    if(value == ''){
      this.getItemList();
    }
    else{
      let temp: Item[] = [];
      this.allItems!.forEach(item => {
        if(item.type == value) temp.push(item);
      });
      this.itemList = temp;
    }

    this.getCartList();
  }

  sortList(value: string){
    console.log(value);
    switch(value) {
      case 'price-up': {
        this.itemList!.sort((a,b) => (b.price! - (b.price!*b.discount!/100)) - (a.price! - (a.price!*a.discount!/100)));
        break;
      }
      case 'price-down': {
        this.itemList!.sort((a,b) => (a.price! - (a.price!*a.discount!/100)) - (b.price! - (b.price!*b.discount!/100)));
        break;
      }
      case 'discount-up': {
        this.itemList!.sort((a,b) => b.discount! - a.discount!);
        break;
      }
      case 'discount-down': {
        this.itemList!.sort((a,b) => a.discount! - b.discount!);
        break;
      }
      default: {
        this.getItemList()
        break;
      }
   }
    this.getCartList();
  }

  getItemList(){
    this.itemService.getItemList()
      .subscribe({
        next: (data) => {
          this.itemList = data;
          this.allItems = data;
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

        },
        error: (error) => {
          console.log(error);
        }
      });
  }


  openItemWindow(id: number) {
    this.route.navigate(["item" , id]);
  }

  addToCart(itemId: number) {
    //patikrinam ar tiek dar yra itemu
    let item: Item | undefined
    this.itemService.getItemById(itemId).subscribe({
      next: (data) => {
        item = data;
        if (item!.quantity! > this.quantityInCart(item.id)) {

          let cartItem: Cart = {
            id: 0,
            itemId: itemId,
            userId: parseInt(localStorage.getItem('userId') || "0"),
            quantity: 1
          }

          this.cartService.addItemToCart(cartItem).subscribe({
            next: (data) => {
              this.getCartList();
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      },
      error: (error) => {
        console.log(error);
      }}
    )

  }

  removeFromCart(itemId: number) {

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

  quantityInCart(itemId: number) {
    for (let i = 0; i < this.cartList!.length; i++) {
      if (this.cartList?.[i].itemId == itemId) {
        return this.cartList?.[i].quantity;
      }
    }
    return 0;
  }

}
