import { ConfirmService } from './../../../../shared/services/confirm.service';
import { AddressFacadeService } from './../../address-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AreaList } from '../../entities';

@Component({
  selector: 'app-address-components-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AddressComponentsAreasComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'city_id','pincode', 'is_active', 'controls'];
  dataSource: MatTableDataSource<AreaList>;
  searchByName:string = ''

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:5,
    totalPages:3,
    totalRecords:200
  }
  totalBanner:number = 0;
  
  constructor(
    private router:Router,
    private facade:AddressFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    this.facade.getAreaList().subscribe(areas => {
      this.dataSource = new MatTableDataSource(areas.data);
      this.pageDetails.totalRecords = areas.totalcount;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.totalBanner = items.data.length;
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
    this.facade.loadAreaList(this.pageDetails.currentPage,event.pageSize,this.searchByName);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Area?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteArea(id)
          .then(res => this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName))
      }
    })
  }

  public navigateToEdit(id){
    // this.facade.loadItemDetails(id).then(item => {
    //   this.router.navigate(['items','edit',id])
    // })
  }

  public filterItem(){
    this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
  }

  public resetFilter(){
    this.searchByName = '';
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    // this.facade.changeActivationStatus(rowcopy).then(res => {
    //   this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    // });
  }

}
