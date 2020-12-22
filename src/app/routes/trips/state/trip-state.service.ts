import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripStateService {

  constructor() { }

  private trips:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isTripListSet:boolean = false;

  public getTripList():Observable<any>{
    return this.trips.asObservable();
  }

  public setTripList(trips:any){
    this.isTripListSet = true;
    this.trips.next(trips);
  }
}
