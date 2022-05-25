import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Address, Cart, Item, Order, OrderItem, Route } from 'src/model/shop.types';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemService } from 'src/app/services/orderItem.service';
import { AddressService } from 'src/app/services/address.service';
import { RouteService } from 'src/app/services/route.service';

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
    private addressService: AddressService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  itemList: Item[] = [];
  cartList: Cart[] = [];

  order: Order | null = null;
  orderItem: OrderItem | null = null;
  item: Item | null = null;

  //inputs
  address: Address | null = null;
  comment: string = "";
  address_b: string = "";
  address_a: string = "";
  address_z: string = "";

  saskaita: string = "";
  galiojimas: string = "";
  ccv: string = "";
  pin: string = "";

  fullCost: number = 0;
  fullDiscount: number = 0;
  sum: number = 0;


  ngOnInit(): void {
    this.itemService.getItemDefaults().subscribe({
      next: (item) =>{
        this.item = item;
      }
    });

    this.addressService.getAddressDefaults().subscribe({
      next: (address) =>{
        this.address = address;
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

            },
            error: (error) => {
             console.log(error);
            }
          });

          this.itemList.forEach(item => {
            this.fullCost += item.price!*item.quantity!
            this.fullDiscount += ((item.price!*item.discount!/100)*item.quantity!)
            this.sum += ((item.price! - (item.price!*item.discount!/100))*item.quantity!)

          });
        },
        error => {
          console.log(error);
        }
      );
  }


  initiatePayment() {
    if(this.address?.city == "" || this.address?.street == ""){
      this.displayStatus("Užpildykite visus būtinus adreso laukus")
      return;
    }
    if(!parseInt(this.address_b) || !parseInt(this.address_a) || !parseInt(this.address_z)){
      this.displayStatus("Neteisingai įrašytas adresas")
      return;
    }
    if(this.address_z.length != 5){
      console.log(this.address_z.length)
      this.displayStatus("Neteisingas zip kodo formatas")
      return;
    }

    if(this.saskaita == "" || this.galiojimas == "" || this.ccv == "" || this.pin == ""){
      this.displayStatus("Užpildykite apmokėjimo duomenis")
      return;
    }
    if(this.saskaita.length < 12 || this.galiojimas.length < 4 || this.ccv.length != 3 || this.pin.length != 4){
      this.displayStatus("Neteisingas apmokėjimo duomenų formatas")
      console.log(this.saskaita.length, this.galiojimas.length, this.ccv.length, this.pin.length)
      return;
    }
    this.pay()


  }

  pay() {
    //order kurimas
    let date =this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let orderNumber: number;
    let order: Order = {
      number: 0,
      date: date!.toString(),
      sum: this.sum,
      discount: this.fullDiscount,
      comment: this.comment,
      status: "APMOKĖTAS",
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

        //sukuria address irasa
        let address: Address = {
          id : 0,
          city: this.address!.city,
          street: this.address!.street,
          building: parseInt(this.address_b),
          apartment: parseInt(this.address_a),
          zipCode: parseInt(this.address_z)
        }

        let addressId: number;
        this.addressService.addAddress(address).subscribe({
          next: (address) => {
            addressId = address.id;

            let route: Route = {
              id : 0,
              dispatchDate: "",
              deliveryDate: "",
              orderNumber: orderNumber,
              addressId: addressId,
              userId: parseInt(localStorage.getItem('userId') || "0")
            }

            //sukuria route irasa
            this.routeService.addRoute(route).subscribe({
              next: () => {
              },
              error: (error) => {
                console.log(error);
                this.displayStatus("Nepavyko sukurti address")
              }}
            )

            //isvalomas krepselis
            this.itemList.forEach(item => {
              this.cartService.deleteItemFromCart(item.id).subscribe(() => this.router.navigate(["order" , orderNumber]));
            });


          },
          error: (error) => {
            console.log(error);
            this.displayStatus("Nepavyko sukurti address")
          }}
        )
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        this.displayStatus("Nepavyko sukurti uzsakymo")
      }}
    )




  }

  displayStatus(text: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

}
