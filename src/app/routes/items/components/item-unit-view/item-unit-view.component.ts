import { hmrBootstrap } from './../../../../../hmr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { itemList, itemUnit, updateItemDepoPrice } from '../../entities';
import { ItemsFacadeService } from '../../items-facade.service';

@Component({
  selector: 'app-item-unit-view',
  templateUrl: './item-unit-view.component.html',
  styleUrls: ['./item-unit-view.component.scss']
})
export class ItemUnitViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    private facade:ItemsFacadeService) {}

  itemTypes:any= {SELLABLE:'Sellable',PACKAGING_MATERIAL:'Packaging Material',RAW_MATERIAL:'Raw Material'};
  displayedColumns: string[] = ['price', 'qty', 'unit' ,'is_customer_show'];
  dataSource:any[] = [];
  public defaultUnitId = '';


  ngOnInit(): void {
    let units:any[] = this.data.all_item_units
    this.dataSource =  this.data.all_item_units || [];
    let defaultunits:any = units.filter(item =>  item.is_customer_show == true)
    if(defaultunits && defaultunits.length > 0) this.defaultUnitId = defaultunits[0]._id;
  }

  public changePrice(){
    let updatedata = {...this.data}
    let body:updateItemDepoPrice = {
      item_id:updatedata._id,
      position:updatedata.position,
      is_active:updatedata.is_active,
      availability_status:updatedata.availability_status,
      item_units:this.dataSource,
      user_id:'5fbf5b9f5724111c6f29e903',
    }
    this.facade.updateItemDepoPrice(body);
  }

  public radioChange(event){
    let value = event.value
    let updatedata = {...this.data}

    //get row details
    let body:updateItemDepoPrice = {
      item_id:updatedata._id,
      position:updatedata.position,
      is_active:updatedata.is_active,
      availability_status:updatedata.availability_status,
      user_id:'5fbf5b9f5724111c6f29e903',
    }

    //update default item unit
    let updatedDatasource = [...this.dataSource];
    updatedDatasource.map(unit => {
      if(unit._id == value){ unit.is_customer_show = true}
      else {unit.is_customer_show = false;}
    })
    body.item_units = updatedDatasource;
    this.dataSource = updatedDatasource;
    this.facade.updateItemDepoPrice(body);
  }

}
