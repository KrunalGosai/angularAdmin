import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadRequestList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''):Observable<any>{
    let url = this.baseUrl+`/api/request-order/list?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&pageSize=${currentPageSize}`;
    // if(searchOfferType && searchOfferType.trim() != '')
    //   url += `&offer_type=${searchOfferType}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public deleteRequest(OfferId){
    let url = this.baseUrl+`/api/offers/delete/${OfferId}`;
    return this.http.delete(url);
  }

  public updateActivationStatus(is_active:boolean,offer_id:string){
    let url = this.baseUrl+`/api/offers/active-deactive`;
    let body = {
      offer_id,is_active
    }
    return this.http.patch(url,body);
  }
  public raiseRequest(reqData){
    let url = this.baseUrl+`/api/request-order/request`;
    let body = reqData
    return this.http.post(url,body);
    
  }
  
}
