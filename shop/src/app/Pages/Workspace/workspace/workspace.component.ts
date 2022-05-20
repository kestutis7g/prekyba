import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/model/shop.types';

import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  displayedColumns = ['name', 'price', 'discount', 'quantity', 'description', 'type', 'edit', 'delete', 'balance']
  //displayedColumns = ['name', 'price', 'description', 'quantity', 'discount', 'type']
  isLoadingResults = true;

  itemList: Item[] = [];
  dialog: any;

  constructor(
    private itemService: ItemService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.itemService.getItemList()
      .subscribe({
        next: (data) => {
          this.itemList = data;
        },
        error: (error) => {
          console.log(error);
        }}
      );

  }


  deleteItem(id: number, name: string) {


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-primary m-1',
        confirmButton: 'btn btn-danger m-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.deleteItemFromList(id).subscribe({
          next:() => this.ngOnInit(),
          error: (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Could not delete',
              text: 'Item is already in someones cart',
            })
          }}
          );
        swalWithBootstrapButtons.fire(
          'Deleted!',
          '',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })


    //if (confirm("Are you sure to delete " + name)) {
    //  this.itemService.deleteItemFromList(id).subscribe(() => this.ngOnInit());
    //}

  }



  editItem(id: number) {
    this.route.navigate(["edit-item/" + id]);
  }

}
