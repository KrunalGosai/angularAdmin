import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferStateService {

  constructor() { }

  private offers:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isOffersSet:boolean = false;

  public getOfferList():Observable<any>{
    return this.offers.asObservable();
  }

  public setOfferList(itemList:any){
    this.isOffersSet = true;
    this.offers.next(itemList);
  }
}
