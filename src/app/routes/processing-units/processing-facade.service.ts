import { tap } from 'rxjs/operators';
import { ProcessingStateService } from './state/processing-state.service';
import { ProcessingApiService } from './api/processing-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingFacadeService {

  constructor(private api:ProcessingApiService,private state:ProcessingStateService) { }

  public loadProcessingUnitsList(currentPage = 0,currentPageSize = 0){
    this.api.getProcessingUnitsList(currentPage,currentPageSize).subscribe(pro => {
      this.state.setProcessingUnitsList(pro);
    },err => console.error('api call error from load ProcessingUnits ',err))
  }


  public getProcessingUnitsList(currentPage = 0,currentPageSize = 0){
    if(!this.state.isProcessingSet) this.loadProcessingUnitsList(currentPage,currentPageSize)
    return this.state.getProcessingListList().pipe(tap(cate => cate))
  }
}
