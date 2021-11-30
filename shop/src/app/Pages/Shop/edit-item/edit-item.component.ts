import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(
    private service: ApiService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  item: IItem = new IItem();

  ngOnInit(): void {
  }

  updateItem() {
    let item: IItem = this.item!;

    let route = this.activatedRoute.params.subscribe(params => {
      item.id = params['id']
      this.service.updateItem(item).subscribe()
    });
  }

  deleteItem() {

    let route = this.activatedRoute.params.subscribe(params => {

      this.service.deleteItemFromList(params['id']).subscribe(() => this.route.navigate(["/home"]))
    });


  }

}
