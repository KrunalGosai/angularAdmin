import { ConfirmService } from './../../../../shared/services/confirm.service';
import { MatTableDataSource } from '@angular/material/table';
import { itemList } from './../../../items/entities/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrdersFacadeService } from './../../orders-facade.service';
import { Component, OnInit } from '@angular/core';
import { UnitesFacadeService } from 'app/routes/unites/unites-facade';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class OrdersDispatchComponent implements OnInit {

  public viewData:any = {};
  displayedColumns: string[] = ["item_id","item_unit_id","item_quantity","controls"];
  dataSource = [];
  tableSource:MatTableDataSource<any>;
  dispatchFrom: FormGroup;
  itemList = [];
  unitList = [];
  allUnitList = [];

  constructor(
    private facade:OrdersFacadeService,
    private confirmService:ConfirmService,
    private unitFacade:UnitesFacadeService,
    private sidebarNoticeService: SidebarNoticeService,
    private itemFacade:ItemsFacadeService,
    private fb: FormBuilder) {
    this.dispatchFrom = this.fb.group(
      {
        item_id : ['',[Validators.required]], 
        item_name : [''],
        item_quantity:[0],
        item_unit_id :['',[Validators.required]], 
        final_purchase_price : [0]   
      });
   }
  
  ngOnInit(): void {
    this.facade.getViewData().subscribe(row => {
      this.viewData = row;
    })
    this.loadDropdowns();
  }

  public onFormSubmit(event){
    if(!this.dispatchFrom.valid) return;
    let value = this.dispatchFrom.value;
    this.dataSource.push(value);
    this.dispatchFrom.reset();
    this.reloadTable();
  }

  private loadDropdowns(){
    this.itemFacade.getItemList().subscribe(items => {
      this.itemList = items.data;
    })
    this.unitFacade.getUnites().subscribe(units => {
      this.allUnitList = units.data;
    })
  }

  public reloadTable(){
    this.tableSource = new MatTableDataSource(this.dataSource);
  }

  public deleteIcon(ind){
    let data = [...this.dataSource];
    data.splice(ind,1);
    this.dataSource = [...data];
    this.reloadTable();
  }

  public readyFroDispatch(){
    let body = {
      items: this.dataSource,
      order_id: this.viewData._id,
      status: "READY_FOR_DISPATCH",
    }
    this.facade.setReadyForDispatch(body).then(res => {
      this.dispatchFrom.reset();
      this.dataSource = [];
      this.sidebarNoticeService.setIsOpened(false);
    })
  }

}
