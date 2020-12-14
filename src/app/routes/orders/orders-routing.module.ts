import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersOrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [{ path: ':order_type', component: OrdersOrderListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
