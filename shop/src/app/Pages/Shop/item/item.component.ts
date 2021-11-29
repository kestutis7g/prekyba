import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: IItem | undefined

  constructor(
    private service: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let route = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
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
  }

}
