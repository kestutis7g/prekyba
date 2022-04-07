import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/types/shop.types';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    private itemService: ItemService
  ) { }

  item: Item | null = null;

  ngOnInit(): void {
    this.itemService.getItemDefaults().subscribe({
      next: (item) =>{
        this.item = item;
      }
    });
  }

  addItem() {
    let item: Item = this.item!;

    this.itemService.addItem(item).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    )

  }
}
