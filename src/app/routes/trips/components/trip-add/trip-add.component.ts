import { TripFacadeService } from './../../trip-facade.service';
import { Component, OnInit } from '@angular/core';
import { OrdersFacadeService } from 'app/routes/orders/orders-facade.service';

@Component({
  selector: 'app-trips-components-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss']
})
export class TripsComponentsTripAddComponent implements OnInit {

  isEditMode:boolean = false;
  searchByOrderType = 'CUSTOMER_ORDER';
  orders:any[] = [];
  constructor(
    private orderFacade:OrdersFacadeService,
    private facade:TripFacadeService
  ) { }

  ngOnInit() {
    this.orderFacade.getOrderList(0,0,this.searchByOrderType).subscribe(orders => {
      this.orders = orders.data;
    })
  }

  filterOrder(){
    this.orderFacade.loadOrderList(0,0,this.searchByOrderType);
  }

  public resetFilter(){
    this.searchByOrderType = 'CUSTOMER_ORDER';
  }

}
