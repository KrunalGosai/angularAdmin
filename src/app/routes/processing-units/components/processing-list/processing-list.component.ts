import { PageEvent } from '@angular/material/paginator';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { ProcessingFacadeService } from './../../processing-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-processing-units-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss']
})
export class ProcessingUnitsProcessingListComponent implements OnInit {

  displayedColumns: string[] = ["position","offer_type","min_value","discount_type","discount_value","coupon_code","expiry","is_active", "created_at","controls"];
  dataSource: MatTableDataSource<any>;
  offerTypeList:any[] = [{name:"Order",value:"ORDER"},{name:"Category",value:"CATEGORY"},{name:"Item",value:"ITEM"},{name:"Age",value:"AGE"},{name:"Gender",value:"GENDER"}]
  searchOfferType = ''

  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:10,
    totalPages:3,
    totalRecords:200
  }
  totalBanner:number = 0;
  
  constructor(
    private router:Router,
    private facade:ProcessingFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    // this.filterProcessingUnis()
    this.facade.getProcessingUnitsList().subscribe(offer => {
      console.log(offer)
      this.dataSource = new MatTableDataSource(offer.data);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = offer.totalCount;
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public pageEvent(event:PageEvent){
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex+1;
    this.filterProcessingUnis()
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

  public filterProcessingUnis(){
    // this.facade.loadProcessingUnitsList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage)
  }

  public resetFilter(){
    this.searchOfferType = '';
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    // this.facade.changeActivationStatus(rowcopy).then(res => {
    //   this.filterOffer()
    // });
  }

}
