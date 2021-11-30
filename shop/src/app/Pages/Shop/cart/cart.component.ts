import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatTable) table!: MatTable<IItem>;
  cartDisplayedColumns = ['userId', 'itemId', 'quantity']
  displayedColumns = ['name', 'price', 'quantity', 'discount', 'type', 'button']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList: IItem[] = [];
  cartList?: ICart[];
  pay: boolean = false;

  constructor(
    private service: ApiService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.refreshCartList();

    // this.service.getCartListById(parseInt(localStorage.getItem('userId') || "0"))
    //   .subscribe(
    //     dataCart => {
    //       this.cartList = dataCart;
    //       if (this.cartList != null) {
    //         this.cartList.forEach(item => {
    //           this.service.getItemById(item.itemId)
    //             .subscribe(
    //               dataItem => {
    //                 this.itemList.push(dataItem)
    //                 console.log("itemas 0 : ", this.itemList[0]);
    //               },
    //               error => {
    //                 console.log(error);
    //               }
    //             );
    //         });
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // console.log(this.itemList);
  }

  deleteItem(id: number) {

    this.service.deleteItemFromCart(id).subscribe(() => this.refreshCartList());

  }
  refreshCartList() {
    this.service.getItemListByUserId(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe(
        data => {
          this.itemList = data;

          if (localStorage.getItem('type') != "guest") {
            if (this.itemList.length > 0) {
              this.pay = true;
            }
            else {
              this.pay = false;
            }
          }
          else {
            this.pay = false;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  pushButton(id: number) {
    this.route.navigate(["item/" + id]);
  }

}
