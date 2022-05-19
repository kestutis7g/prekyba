import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Cart, Item, Order, OrderItem } from 'src/model/shop.types';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemService } from 'src/app/services/orderItem.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  itemList: Item[] = [];
  cartList: Cart[] = [];

  order: Order | null = null;
  orderItem: OrderItem | null = null;
  item: Item | null = null;

  total: number = 0;
  discount: number = 0;


  ngOnInit(): void {
    this.itemService.getItemDefaults().subscribe({
      next: (item) =>{
        this.item = item;
      }
    });

    this.itemService.getItemListByUserId(parseInt(localStorage.getItem('userId') || "0"))
      .subscribe(
        data => {
          this.itemList = data;
          console.log(data);
          this.cartService.getCartListByUserId(parseInt(localStorage.getItem('userId') || "0"))
            .subscribe({
            next: (data) => {
              this.cartList = data;
              console.log(this.cartList);
            },
            error: (error) => {
             console.log(error);
            }
          });

          this.itemList.forEach(item => {
            this.total += ((item.price! - (item.price!*item.discount!/100))*item.quantity!)
            this.discount += ((item.price!*item.discount!/100)*item.quantity!)
          });
        },
        error => {
          console.log(error);
        }
      );
  }



  pay() {
    //order kurimas
    let date =this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let orderNumber: number;
    let order: Order = {
      number: 0,
      date: date!.toString(),
      sum: this.total,
      discount: this.discount,
      comment: "",
      status: "",
      userId: parseInt(localStorage.getItem('userId') || "0")
    }

    this.orderService.addOrder(order).subscribe({
      next: (order) => {
        orderNumber = order.number;

        this.cartList.forEach(cartItem => {
          let orderItem: OrderItem = {
            id: 0,
            quantity: cartItem.quantity,
            orderNumber: orderNumber,
            itemId: cartItem.itemId
          }
          //atnaujina item kiekio reiksmes
          this.itemService.getItemById(cartItem.itemId).subscribe({
            next: (data) => {
              let item: Item = data;
              item.id = cartItem.itemId;
              item.quantity = data.quantity! - cartItem.quantity;

              this.itemService.updateItem(item).subscribe()
            },
            error: (error) => {
              console.log(error);
            }}
          )

          //sukuria orderItem irasus
          this.orderItemService.addOrderItem(orderItem).subscribe({
            next: () => {
            },
            error: (error) => {
              console.log(error);
              this.displayStatus("Nepavyko sukurti order item")
            }}
          )

        });
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.displayStatus("Nepavyko sukurti uzsakymo")
      }}
    )


    //isvalomas krepselis
    this.itemList.forEach(item => {
      this.cartService.deleteItemFromCart(item.id).subscribe(() => this.router.navigate(["/home"]));
    });

  }

  displayStatus(text: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

}
