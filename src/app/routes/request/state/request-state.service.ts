import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {

  constructor() { }

  private requests:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isRequestsSet:boolean = false;

  public getRequestList():Observable<any>{
    return this.requests.asObservable();
  }

  public setRequestList(isRequestList:any){
    this.isRequestsSet = true;
    this.requests.next(isRequestList);
  }
}
