import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersOrderListComponent } from './components/order-list/order-list.component';
import { OrdersComponentsOrderViewComponent } from './components/order-view/order-view.component';

const COMPONENTS = [OrdersOrderListComponent, OrdersComponentsOrderViewComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class OrdersModule { }
