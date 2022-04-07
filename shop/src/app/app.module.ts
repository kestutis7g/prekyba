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


import { HistoryComponent } from './testpage/history.component'

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './Pages/General/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

import { EncrDecrService } from './services/EncrDecrService';
import { AddItemComponent } from './Pages/Workspace/add-item/add-item.component';
import { EditItemComponent } from './Pages/Workspace/edit-item/edit-item.component';
import { WorkspaceComponent } from './Pages/Workspace/workspace/workspace.component';
import { ItemBalanceComponent } from './Pages/Workspace/item-balance/item-balance.component';



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
    ItemBalanceComponent
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

    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatGridListModule
  ],
  providers: [EncrDecrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
