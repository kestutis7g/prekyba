import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/model/shop.types';
import Swal from 'sweetalert2';

interface Type {
  value: string;
  viewValue: string;
}

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
  tipas: string = '';

  types: Type[] = [
    {value: 'Tranportas', viewValue: 'Transportas'},
    {value: 'Kompiuterija', viewValue: 'Kompiuterija'},
    {value: 'Komunikacija', viewValue: 'Komunikacija'},
    {value: 'Drabužiai', viewValue: 'Drabužiai'},
    {value: 'Technika', viewValue: 'Technika'},
    {value: 'Buitis', viewValue: 'Buitis'},
  ];

  ngOnInit(): void {
    // this.itemService.getItemDefaults().subscribe({
    //   next: (item) =>{
    //     this.item = item;
    //   }
    // });

    let route = this.activatedRoute.params.subscribe(params => {

      this.itemService.getItemById(params['id']).subscribe({
        next: (data) =>{
          this.item = data;
          this.tipas = data.type;
        }
      });

    });


  }


  updateItem() {
    let item: Item = this.item!;
    item.type = this.tipas;

    if (!item.name.replace(/\s/g, '').length) {
      this.displayStatus("Įrašykite pavadinimą")
      return;
    }
    if (!item.description.replace(/\s/g, '').length) {
      this.displayStatus("Įrašykite aprašymą")
      return;
    }
    if(item.price == null || item.quantity == null || item.discount == null){
      this.displayStatus("Įveskite visas privalomas reikšmes")
      return;
    }
    if(!parseInt(item.price!.toString()) || !parseInt(item.quantity!.toString())){
      this.displayStatus("Netaisingai įvestas skaičiaus formatas")
      console.log(item.price, item.quantity)
      return;
    }
    if(item.discount < 0 || item.discount != 0 && !parseInt(item.discount!.toString())){
      this.displayStatus("Netaisingai įvestas nuolaidos skaičiaus formatas")
      console.log(item.discount)
      return;
    }
    if(this.tipas == ''){
      this.displayStatus("Pasirinkite tipą")
      return;
    }

    let route = this.activatedRoute.params.subscribe(params => {
      item.id = params['id']
      this.itemService.updateItem(item).subscribe(
        {
          next: () => {
            this.route.navigate(["/workspace"])
          },
          error: (error) => {
            this.displayStatus("Nepavyko atnaujinti duomenų")
          }}

        )
    });
  }

  deleteItem() {

    let route = this.activatedRoute.params.subscribe(params => {

      this.itemService.deleteItemFromList(params['id']).subscribe(() => this.route.navigate(["/home"]))
    });


  }

  displayStatus(text: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

}
