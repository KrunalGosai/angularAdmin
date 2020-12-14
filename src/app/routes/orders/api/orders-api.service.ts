import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = ''):Observable<any>{
    let url = this.baseUrl+`/api/request-order/order/list?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&pageSize=${currentPageSize}`;
    if(searchByOrderType && searchByOrderType.trim() != '')
      url += `&searchByOrdertype=${searchByOrderType}`;
    if(searchByOrderStatus && searchByOrderStatus.trim() != '')
      url += `&searchByOrderstatus=${searchByOrderStatus}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public cancelOrder(order_id){
    let body = {order_id,status:"CANCELLED"}
    let url = this.baseUrl+`/api/request-order/change-order-status`;
    return this.http.post(url,body);
  }

}
