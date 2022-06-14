import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/model/shop.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css'],
})
export class AdminOrderListComponent implements OnInit {
  constructor(private orderService: OrderService, private router: Router) {}

  displayedColumns = [
    'number',
    'date',
    'sum',
    'discount',
    'status',
    'userId',
    'open',
    'changeStatus',
  ];
  orderList: Order[] = [];

  ngOnInit(): void {
    this.updateOrders();
  }

  async changeStatus(id: string) {
    const { value: status } = await Swal.fire({
      width: 600,
      title: 'Pakeisti užsakymo būseną',
      input: 'radio',
      inputOptions: {
        APMOKĖTAS: 'Apmokėtas',
        PATVIRTINTAS: 'Patvirtintas',
        IŠSIŲSTAS: 'Išsiųstas',
        ATŠAUKTAS: 'Atšauktas',
        ĮVYKDYTAS: 'Įvykdytas',
      },
      inputPlaceholder: 'Status',
      confirmButtonText: 'Pakeisti',
      //'<i style="color: #eb13c7">Ok</i> ',
      showCancelButton: true,
      cancelButtonText: 'Atšaukti',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('Niekas nepasirinkta');
          } else {
            resolve('');
          }
        });
      },
    });

    if (status) {
      Swal.fire({
        icon: 'success',
        title: `Užsakymo Nr.${id} būsena pakeista \n ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });

      this.orderService.getOrderDefaults().subscribe({
        next: (data) => {
          let order = data;
          order.status = status;
          order.id = id;
          console.log(order);
          this.orderService.updateOrder(order).subscribe({
            next: (data) => {
              this.updateOrders();
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
      });
    }
  }

  openOrder(number: number) {
    this.router.navigate(['order', number]);
  }

  updateOrders() {
    this.orderService.getOrderList().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
