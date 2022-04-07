import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/model/shop.types';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  item: Item | null = null;

  ngOnInit(): void {
    this.itemService.getItemDefaults().subscribe({
      next: (item) =>{
        this.item = item;
      }
    });
  }

  updateItem() {
    let item: Item = this.item!;

    let route = this.activatedRoute.params.subscribe(params => {
      item.id = params['id']
      this.itemService.updateItem(item).subscribe(() => this.route.navigate(["/workspace"]))
    });
  }

  deleteItem() {

    let route = this.activatedRoute.params.subscribe(params => {

      this.itemService.deleteItemFromList(params['id']).subscribe(() => this.route.navigate(["/home"]))
    });


  }

}
