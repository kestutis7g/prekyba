import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  displayedColumns = ['name', 'price', 'discount', 'quantity', 'description', 'type', 'edit', 'delete']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList: IItem[] = [];
  dialog: any;

  constructor(private service: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    this.service.getItemList()
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

  pushButton(id: number) {
    console.log(id);
    this.route.navigate(["item/" + id]);
  }

  deleteItem(id: number, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      this.service.deleteItemFromList(id).subscribe(() => this.ngOnInit());
    }

  }

  editItem(id: number) {
    this.route.navigate(["edit-item/" + id]);
  }

}
