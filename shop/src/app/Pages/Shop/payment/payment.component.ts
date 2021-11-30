import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private service: ApiService,
    private route: Router,

  ) { }

  itemList: IItem[] = [];

  ngOnInit(): void {
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

  clearCart() {
    this.itemList.forEach(item => {
      this.service.deleteItemFromCart(item.id).subscribe(() => this.route.navigate(["/home"]));
    });

  }

}
