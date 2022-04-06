import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/General/home/home.component';

//Vartotojo
import { LoginComponent } from './Pages/General/login/login.component';
import { RegisterComponent } from './Pages/General/register/register.component';

//Parduotuve
import { ShopComponent } from './Pages/Shop/shop/shop.component';
import { CartComponent } from './Pages/Shop/cart/cart.component';
import { PaymentComponent } from './Pages/Shop/payment/payment.component';
import { ItemComponent } from './Pages/Shop/item/item.component';

//Darbuotojo irankiai
import { EditItemComponent } from './Pages/Workspace/edit-item/edit-item.component';
import { AddItemComponent } from './Pages/Workspace/add-item/add-item.component';
import { WorkspaceComponent } from './Pages/Workspace/workspace/workspace.component';
import { ItemBalanceComponent } from './Pages/Workspace/item-balance/item-balance.component';
import { DeleteItemComponent } from './Pages/Workspace/delete-item/delete-item.component';

import { HistoryComponent } from './testpage/history.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "shop", component: ShopComponent },
  { path: "cart", component: CartComponent },
  { path: "payment", component: PaymentComponent },
  { path: "add-item", component: AddItemComponent },
  { path: "item/:id", component: ItemComponent },
  { path: "history", component: HistoryComponent },
  { path: "edit-item/:id", component: EditItemComponent },
  { path: "workspace", component: WorkspaceComponent },
  { path: "item-balance", component: ItemBalanceComponent },
  { path: "delete-item/:id", component: DeleteItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
