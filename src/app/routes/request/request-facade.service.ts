import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestStateService } from './state/request-state.service';
import { RequestApiService } from './api/request-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestFacadeService {

  constructor(private api:RequestApiService,private state:RequestStateService,private toster: ToastrService) { }

  public loadReuestList(currentPage = 0,currentPageSize = 0,searchByRequesttype:String = ''){
    this.api.loadRequestList(currentPage ,currentPageSize,searchByRequesttype).subscribe(requestList => {
      this.state.setRequestList(requestList);
    },err => console.error('api call error from load request ',err))
  }


  public getRequestList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''){
    if(!this.state.isRequestsSet) this.loadReuestList(currentPage ,currentPageSize,searchOfferType)
    return this.state.getRequestList().pipe(tap(cate => cate))
  }


  public deleteOffer(requestId){
    return this.api.deleteRequest(requestId).toPromise().then(res => {
      this.toster.success('Offer Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete request',err); throw err })
  }
  public raiseRequest(reqData:any){
    return this.api.raiseRequest(reqData).toPromise().then((res:any) => {
      this.toster.success(res.message,'Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from raise request',err); throw err });
  }
  
}
