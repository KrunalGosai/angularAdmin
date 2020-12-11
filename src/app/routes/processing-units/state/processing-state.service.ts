import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingStateService {

  private processingUnits:BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  public isProcessingSet:boolean = false;

  public getProcessingListList():Observable<any>{
    return this.processingUnits.asObservable();
  }

  public setProcessingUnitsList(procesingUnits:any){
    this.isProcessingSet = true;
    this.processingUnits.next(procesingUnits);
  }
  
}
