import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { OfferStateService } from './state/offer-state.service';
import { OfferApiService } from './api/offer-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferFacadeService {

  constructor(private api:OfferApiService,private state:OfferStateService,private toster: ToastrService) { }

  public loadOfferList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''){
    this.api.loadOfferList(currentPage ,currentPageSize,searchOfferType).subscribe(offers => {
      this.state.setOfferList(offers);
    },err => console.error('api call error from load offers ',err))
  }


  public getOfferList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''){
    if(!this.state.isOffersSet) this.loadOfferList(currentPage ,currentPageSize,searchOfferType)
    return this.state.getOfferList().pipe(tap(cate => cate))
  }

  public deleteOffer(OfferId){
    return this.api.deleteOffer(OfferId).toPromise().then(res => {
      this.toster.success('Offer Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Offer',err); throw err })
  }

  public changeActivationStatus(row:any){
    return this.api.updateActivationStatus(row.is_active,row._id).toPromise().then(res => {
      this.toster.success('Offer Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Offer',err ); throw err  })
  }

  public changePosition(row:any){
    return this.api.changePosition(row.position,row._id).toPromise().then(res => {
      this.toster.success('Offer Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Offer',err ); throw err  })
  }
}
