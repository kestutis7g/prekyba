import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { ICart } from 'src/model/ICart';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: IItem | undefined
  quantity: number = 1
  canEdit: boolean = false;
  constructor(
    private service: ApiService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    let route = this.activatedRoute.params.subscribe(params => {

      this.service.getItemById(params['id']).subscribe(
        data => {
          this.item = data;
          console.log(this.item);
        },
        error => {
          console.log(error);
        }
      )
    });

    if (localStorage.getItem('type') == "admin" || localStorage.getItem('type') == "seller") {
      this.canEdit = true;
    }
    else {
      this.canEdit = false;
    }
  }

  addToCart(id: number) {
    if (this.quantity > 0) {
      console.log(id);
      let cartItem: ICart = {
        id: 0,
        itemId: id,
        userId: parseInt(localStorage.getItem('userId') || "0"),
        quantity: this.quantity
      }

      this.service.addItemToCart(cartItem).subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
    }
  }

  pushButton(id: number) {
    console.log(id);
    this.route.navigate(["edit-item/" + id]);
  }

}
