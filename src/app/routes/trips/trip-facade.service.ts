import { tap } from 'rxjs/operators';
import { TripApiService } from './api/trip-api.service';
import { TripStateService } from './state/trip-state.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TripFacadeService {

  constructor(private api:TripApiService,private state:TripStateService,private toster: ToastrService) { }

  public loadTripList(currentPage = 0,currentPageSize = 0,searchSatus:String = ''){
    this.api.loadTripList(currentPage ,currentPageSize,searchSatus).subscribe(offers => {
      this.state.setTripList(offers);
    },err => console.error('api call error from load trips',err))
  }


  public getTripList(currentPage = 0,currentPageSize = 0,searchSatus:String = ''){
    if(!this.state.isTripListSet) this.loadTripList(currentPage ,currentPageSize,searchSatus)
    return this.state.getTripList().pipe(tap(cate => cate))
  }

}
