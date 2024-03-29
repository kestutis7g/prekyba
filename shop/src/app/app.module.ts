import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Vartotojo
import { LoginComponent } from './Pages/General/login/login.component';
import { RegisterComponent } from './Pages/General/register/register.component';

//Parduotuves
import { ShopComponent } from './Pages/Shop/shop/shop.component';
import { CartComponent } from './Pages/Shop/cart/cart.component';
import { PaymentComponent } from './Pages/Shop/payment/payment.component';
import { ItemComponent } from './Pages/Shop/item/item.component';
import { OrderComponent } from './Pages/Shop/order/order.component';
import { OrderListComponent } from './Pages/Shop/order-list/order-list.component';

import { HistoryComponent } from './testpage/history.component'

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './Pages/General/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

import { EncrDecrService } from './services/EncrDecrService';
import { AddItemComponent } from './Pages/Workspace/add-item/add-item.component';
import { EditItemComponent } from './Pages/Workspace/edit-item/edit-item.component';
import { WorkspaceComponent } from './Pages/Workspace/workspace/workspace.component';
import { ItemBalanceComponent } from './Pages/Workspace/item-balance/item-balance.component';
import { AdminOrderListComponent } from './Pages/Workspace/admin-order-list/admin-order-list.component';
import { NgChartsModule } from 'ng2-charts';
import { CreateRouteComponent } from './Pages/Workspace/create-route/create-route.component';
import { ViewRouteComponent } from './Pages/Workspace/view-route/view-route.component';
import { NumbersOnly } from './directives/numbers-only.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    PaymentComponent,
    AddItemComponent,
    ItemComponent,
    HistoryComponent,
    EditItemComponent,
    WorkspaceComponent,
    ItemBalanceComponent,
    OrderComponent,
    OrderListComponent,
    AdminOrderListComponent,
    CreateRouteComponent,
    ViewRouteComponent,
    NumbersOnly
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    NgChartsModule
  ],
  providers: [
    EncrDecrService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
