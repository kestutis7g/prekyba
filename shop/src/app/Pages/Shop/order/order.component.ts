import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemService } from 'src/app/services/orderItem.service';
import { Item, Order, OrderItem } from 'src/model/shop.types';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private orederItemService: OrderItemService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  displayedColumns = ['name', 'price', 'discount', 'totalPrice', 'quantity', 'description', 'type', 'open']

  order: Order | undefined
  showOrderComment = false;
  orderItemList: OrderItem[] = [];
  fullCost: number = 0;


  itemList = new MatTableDataSource<Item>();

  ngOnInit(): void {
    let route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id){
        return;
      }

      this.orderService.getOrderByNumber(id).subscribe({
        next: (order) => {
          this.order = order;
          if (order.comment.replace(/\s/g, '').length != 0) {
            this.showOrderComment = true;
          }

          this.orederItemService
            .getOrderItemListByOrderNumber(this.order.id!)
            .subscribe({
              next: (data) => {
                this.orderItemList = data;

                let itemList: Item[] = [];

                this.orderItemList.forEach((orderItem) => {
                  this.itemService.getItemById(orderItem.itemId).subscribe({
                    next: (item) => {
                      let temp: Item = item;
                      this.fullCost += item.price! * orderItem.quantity;
                      temp.quantity = orderItem.quantity;

                      this.changeDetectorRefs.detectChanges();
                      itemList.push(temp);
                      this.changeDetectorRefs.detectChanges();
                      this.itemList.data = itemList;
                    },
                    error: (error) => {
                      console.log(error);
                    },
                  });
                });
              },
              error: (error) => {
                console.log(error);
              },
            });
        },
        error: (error) => {
          console.log(error);
        }}
      )
    });
  }

  openItem(id: number){
    this.router.navigate(["item/" + id]);
  }

}
