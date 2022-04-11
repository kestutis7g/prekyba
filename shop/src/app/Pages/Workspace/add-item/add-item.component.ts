import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/model/shop.types';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    private itemService: ItemService, private router: Router
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
        this.router.navigateByUrl('/workspace');
      },
      error => {
        console.log(error);
      }
    )

  }
}
