import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/model/shop.types';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  displayedColumns = ['number', 'date', 'sum', 'discount', 'status', 'open']
  orderList: Order[] = [];



  ngOnInit(): void {
    this.orderService.getOrderListByUserId(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe({
        next: (data) => {
          this.orderList = data;
        },
        error: (error) => {
          console.log(error);
        }}
      );
  }

  openOrder(number: number) {
    this.router.navigate(["order", number]);
  }



}
