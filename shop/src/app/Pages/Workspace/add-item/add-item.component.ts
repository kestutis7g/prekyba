import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/model/shop.types';
import Swal from 'sweetalert2';

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
  tipas: string = '';

  ngOnInit(): void {
    this.itemService.getItemDefaults().subscribe({
      next: (item) =>{
        this.item = item;
      }
    });
  }

  addItem() {
    let item: Item = this.item!;

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
    if(!parseInt(item.price!.toString()) || !parseInt(item.quantity!.toString()) || !parseInt(item.discount!.toString())){
      this.displayStatus("Netaisingai įvestas skaičiaus formatas")
      return;
    }
    if(this.tipas == ''){
      this.displayStatus("Pasirinkite tipą")
      return;
    }

    this.itemService.addItem(item).subscribe({
      next: () => {
        this.router.navigateByUrl('/workspace');
      },
      error: (error) => {
        console.log(error);
        this.displayStatus("Nepavyko sukurti prekės")
      }}
    )

  }

  displayStatus(text: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }
}
