import { availabilityStatus } from './../../entities/index';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { ItemsFacadeService } from './../../items-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { itemList } from '../../entities';
import { SettingsService } from '@core';
import { UserRole } from '@shared/entities';

@Component({
  selector: 'app-items-components-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemsComponentsItemListComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<itemList>;
  itemTypeList:string[] = [];
  itemTypes:any= {SELLABLE:'Sellable',PACKAGING_MATERIAL:'Packaging Material',RAW_MATERIAL:'Raw Material'};
  searchItemType:string = ''
  availabilityStatus:availabilityStatus = null;
  availabilityList = [{name:'Available',value:availabilityStatus.available},{name:'Not Available',value:availabilityStatus.notAvailable},{name:'Notify',value:availabilityStatus.notify}]
  currentRole = this.settingService.user.role_id.type || 'User';

  // @ViewChild(MatPaginator) paginator: MatPaginator;
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
    private settingService:SettingsService,
    private facade:ItemsFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus);
    this.facade.getItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,availabilityStatus).subscribe(items => {
      this.dataSource = new MatTableDataSource(items.data);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.totalBanner = items.data.length;
    })
    this.facade.getItemTypes().subscribe(types => {
      this.itemTypeList = types;
    })
    this.setRoleBasedColumn();
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
    this.facade.loadItemList(this.pageDetails.currentPage,event.pageSize,this.searchItemType,this.availabilityStatus);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Item?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteItem(id)
          .then(res => this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus))
      }
    })
  }

  public navigateToEdit(id){
    this.facade.loadItemDetails(id).then(item => {
      this.router.navigate(['items','edit',id])
    })
  }

  public filterItem(){
    this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus)
  }

  public resetFilter(){
    this.searchItemType = '';
    this.availabilityStatus = null;
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.changeActivationStatus(rowcopy).then(res => {
      this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus);
    });
  }

  private setRoleBasedColumn(){

    //['thumbnail', 'position', 'name', 'type','is_active','category', 'item_volume','price', 'controls'];
    switch (this.currentRole) {
      case UserRole.ADMIN:
        this.displayedColumns = ['thumbnail', 'position', 'name', 'price', 'type','is_active','category', 'controls'];
        break;
      case UserRole.DEPO:
        this.displayedColumns = ['thumbnail', 'position', 'name', 'category', 'item_volume', 'price', 'controls'];
        break;
      case UserRole.HAWKER:
        this.displayedColumns = ['thumbnail', 'position', 'name', 'category', 'item_volume', 'price', 'controls'];
        break;
      default:
        this.displayedColumns = ['thumbnail', 'position', 'name', 'category'];
        break;
    }
   
  }

}
