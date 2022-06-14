import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Cart, Item } from 'src/model/shop.types';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Item>;
  cartDisplayedColumns = ['userId', 'itemId', 'quantity'];
  displayedColumns = [
    'name',
    'price',
    'quantity',
    'discount',
    'fullPrice',
    'type',
    'remove',
    'add',
    'delete',
  ];
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList: Item[] = []; //krepselio turinys item entity pavidalu
  cartList?: Cart[];
  pay: boolean = false;
  fullCost: number = 0;
  fullDiscount: number = 0;
  sum: number = 0;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.refreshCartList();
    this.getCartList();
  }

  deleteItem(id: string) {
    this.cartService
      .deleteItemFromCart(id)
      .subscribe(() => this.refreshCartList());
  }

  refreshCartList() {
    //gauna krepselio sarasa item entity pavidalu
    this.itemService
      .getItemListByUserId(localStorage.getItem('userId') || '')
      .subscribe(
        (data) => {
          this.itemList = data;

          this.fullCost = 0;
          this.fullDiscount = 0;
          this.itemList.forEach((item) => {
            this.fullCost += item.price! * item.quantity!;
            this.fullDiscount +=
              ((item.price! * item.discount!) / 100) * item.quantity!;
          });
          this.sum = this.fullCost - this.fullDiscount;

          if (localStorage.getItem('type') != 'guest') {
            if (this.itemList.length > 0) {
              this.pay = true;
            } else {
              this.pay = false;
            }
          } else {
            this.pay = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCartList() {
    //cart lenteles duomenys

    this.cartService
      .getCartListByUserId(localStorage.getItem('userId') || '')
      .subscribe({
        next: (data) => {
          this.cartList = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  pushButton(id: number) {
    this.route.navigate(['item/' + id]);
  }

  getItemIdByCartId(cartId: string) {
    for (let i = 0; i < this.cartList!.length; i++) {
      if (this.cartList![i].id == cartId) {
        return this.cartList![i].itemId;
      }
    }
    return '';
  }

  addToCart(id: string) {
    let itemId = this.getItemIdByCartId(id);
    //patikrinam ar tiek dar yra itemu
    let item: Item | undefined;
    this.itemService.getItemById(itemId).subscribe({
      next: (data) => {
        item = data;

        if (item!.quantity! > this.quantityInCart(id)) {
          let cartItem: Cart = {
            itemId: itemId,
            userId: localStorage.getItem('userId') || '',
            quantity: 1,
          };

          this.cartService.addItemToCart(cartItem).subscribe({
            next: (data) => {
              this.refreshCartList();
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromCart(id?: string) {
    if (!id) {
      return;
    }

    let itemId = this.getItemIdByCartId(id);

    if (this.quantityInCart(id) > 1) {
      let cartItem: Cart = {
        itemId: itemId,
        userId: localStorage.getItem('userId') || '',
        quantity: -1,
      };

      this.cartService.addItemToCart(cartItem).subscribe(
        (data) => {
          this.refreshCartList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  quantityInCart(itemId?: string): number {
    if (!itemId) {
      return 0;
    }

    for (let i = 0; i < this.itemList!.length; i++) {
      if (this.itemList[i].id == itemId) {
        return this.itemList[i].quantity || 0;
      }
    }
    return 0;
  }
}
