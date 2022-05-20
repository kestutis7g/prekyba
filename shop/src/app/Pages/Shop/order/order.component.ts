import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/model/shop.types';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  order: Order | undefined

  ngOnInit(): void {
    let route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id){
        return;
      }

      this.orderService.getOrderByNumber(id).subscribe({
        next: (data) => {
          this.order = data;

        },
        error: (error) => {
          console.log(error);
        }}
      )
    });
  }

}
