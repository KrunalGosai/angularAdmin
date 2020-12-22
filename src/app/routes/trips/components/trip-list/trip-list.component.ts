import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TripFacadeService } from './../../trip-facade.service';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trips-components-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripsComponentsTripListComponent implements OnInit {

  displayedColumns: string[] = ["trip_name", "assign_time","start_time","end_time","total_cash_collected","total_distance_travelled","role_type", "status",'total_amount_to_collect',"controls"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:10,
    totalPages:3,
    totalRecords:200
  }

  constructor(
    private router:Router,
    private facade:TripFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.facade.getTripList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,'').subscribe(trips => {
      this.dataSource = new MatTableDataSource(trips.trips);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = trips.totalcount;
    })
  }
  
  public pageEvent(event:PageEvent){
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex+1;
    this.filterTrip()
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this offer?','Confirm').subscribe(result => {
      if(result == true){
        // this.facade.deleteOffer(id)
        //   .then(res => this.filterOffer())
      }
    })
  }

  public navigateToEdit(id){
    // this.facade.loadOfferDetails(id).then(item => {
    //   this.router.navigate(['offers','edit',id])
    // })
  }

  public filterTrip(){
    this.facade.loadTripList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,'')
  }

  public resetFilter(){
    // this.searchOfferType = '';
  }

}
