import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OrdersStateService } from './state/orders-state.service';
import { OrdersApiService } from './api/orders-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersFacadeService {

  constructor(private api:OrdersApiService,private state:OrdersStateService,private toster: ToastrService) { }

  public loadOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = '',searchBySource = '', searchByDestination = ''){
    this.api.loadOrderList(currentPage ,currentPageSize,searchByOrderType,searchByOrderStatus,searchBySource, searchByDestination).subscribe(offers => {
      this.state.setOrderList(offers);
    },err => console.error('api call error from load orders ',err))
  }


  public getOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = '',searchBySource = '', searchByDestination = ''){
    if(!this.state.isOrdersSet) this.loadOrderList(currentPage ,currentPageSize, searchByOrderType,searchByOrderStatus,searchBySource, searchByDestination)
    return this.state.getOrderList().pipe(tap(cate => cate))
  }

  public cancelOrder(order_id){
    return this.api.cancelOrder(order_id).toPromise().then(res => {
      this.toster.success('Order Successfully Canceled','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Cancel Order',err); throw err })
  }

  public setViewData(viewData){
    this.state.setViewData(viewData);
  }

  public getViewData(){
    return this.state.getViewData().pipe(tap(data => data))
  }

  public setDeliveryData(setDeliveryData){
    this.state.setDeliveryData(setDeliveryData);
  }

  public getDeliveryData(){
    return this.state.getDeliveryData().pipe(tap(data => data))
  }

  public setReadyForDispatch(dispatchOrder){
    return this.api.setReadyForDispatch(dispatchOrder).toPromise().then(res => {
      this.loadOrderList();
      this.toster.success('Order Successfully Updated','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from setReadyForDispatch',err); throw err })

  }
}
