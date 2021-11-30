import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
export class CartComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<IItem>;
  cartDisplayedColumns = ['userId', 'itemId', 'quantity']
  displayedColumns = ['name', 'price', 'quantity', 'discount', 'type', 'button']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList: IItem[] = [];
  cartList?: ICart[];

  constructor(
    private service: ApiService,
    private route: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }
  ngAfterViewInit(): void {
    console.log("ce yra table sudas ", this.table)
    this.itemList = this.itemList
  }

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

    // this.service.getItemList()
    //   .subscribe(
    //     data => {
    //       this.itemList = data;
    //       console.log(this.itemList);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }

  deleteItem(id: number) {

    this.service.deleteItemFromCart(id).subscribe(() => this.refreshCartList());

  }
  refreshCartList() {
    this.service.getItemListByUserId(parseInt(localStorage.getItem('userId') || "0"))
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
