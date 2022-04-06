import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(
    private service: ApiService
  ) { }

  item: IItem = new IItem();

  ngOnInit(): void {
  }

  addItem() {
    let item: IItem = this.item!;

    this.service.addItem(item).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    )

  }
}
