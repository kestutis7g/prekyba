import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/General/home/home.component';

//Vartotojo
import { LoginComponent } from './Pages/General/login/login.component';
import { RegisterComponent } from './Pages/General/register/register.component';
import { EditAccountComponent } from './Pages/General/edit-account/edit-account.component';
import { BalanceComponent } from './Pages/General/balance/balance.component';
import { GymComponent } from './Pages/General/gym/gym.component';
import { PassportComponent } from './Pages/General/passport/passport.component';

//Parduotuve
import { ShopComponent } from './Pages/Kestutis/shop/shop.component';
import { CartComponent } from './Pages/Kestutis/cart/cart.component';
import { PaymentComponent } from './Pages/Kestutis/payment/payment.component';
import { AddItemComponent } from './Pages/Kestutis/add-item/add-item.component';
import { ItemComponent } from './Pages/Kestutis/item/item.component';

//Prenumeratos
import { SubscriptionComponent } from './Pages/Robertas/subscription/subscription.component';
import { SubCancelComponent } from './Pages/Robertas/sub-cancel/sub-cancel.component';
import { SubExtendComponent } from './Pages/Robertas/sub-extend/sub-extend.component';
import { SubCreateComponent } from './Pages/Robertas/sub-create/sub-create.component';
import { SubTransferComponent } from './Pages/Robertas/sub-transfer/sub-transfer.component';
import { SubPauseComponent } from './Pages/Robertas/sub-pause/sub-pause.component';

//treniruociu
import { WorkoutComponent } from './Pages/Dainius/workout/workout.component';
import { WorkoutDetailsComponent } from './Pages/Dainius/workout-details/workout-details.component';
import { WorkoutRegisterComponent } from './Pages/Dainius/workout-register/workout-register.component';
import { WorkoutCalendarComponent } from './Pages/Dainius/workout-calendar/workout-calendar.component';

import { HistoryComponent } from './history/history.component';

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
  { path: "edit-account", component: EditAccountComponent },
  { path: "balance", component: BalanceComponent },
  { path: "gym", component: GymComponent },
  { path: "passport", component: PassportComponent },
  { path: "subscription", component: SubscriptionComponent },
  { path: "sub-cancel", component: SubCancelComponent },
  { path: "sub-extend", component: SubExtendComponent },
  { path: "sub-create", component: SubCreateComponent },
  { path: "sub-transfer", component: SubTransferComponent },
  { path: "sub-pause", component: SubPauseComponent },
  { path: "workout", component: WorkoutComponent },
  { path: "workout-details", component: WorkoutDetailsComponent },
  { path: "workout-register", component: WorkoutRegisterComponent },
  { path: "workout-calendar", component: WorkoutCalendarComponent },
  { path: "history", component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
