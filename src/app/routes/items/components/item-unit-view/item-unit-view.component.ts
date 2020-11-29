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

  constructor(@Inject(MAT_DIALOG_DATA) public viewdata:any,
    private facade:ItemsFacadeService) {}

  isAnyChange:boolean = false;
  data:any
  searchUserId:string = '';
  itemTypes:any= {SELLABLE:'Sellable',PACKAGING_MATERIAL:'Packaging Material',RAW_MATERIAL:'Raw Material'};
  displayedColumns: string[] = ['price', 'qty', 'unit' ,'is_customer_show'];
  dataSource:any[] = [];
  public defaultUnitId = '';


  ngOnInit(): void {
    this.data = this.viewdata.row;
    this.searchUserId = this.viewdata.searchUserId;
    let units:any[] = this.data.all_item_units
    this.dataSource =  this.data.all_item_units || [];
    let defaultunits:any = units.filter(item =>  item.is_customer_show == true)
    if(defaultunits && defaultunits.length > 0) this.defaultUnitId = defaultunits[0]._id;
  }

  public changePrice(){
    this.updateItemDepo(false);
  }

  public radioChange(event){
    let value = event.value
    this.updateItemDepo(true,value)
  }

  public updateItemDepo(isRadioChange:boolean = false,value = ''){
    let updatedata = {...this.data}
    
    let updatedDatasource = [];

    if(isRadioChange && isRadioChange == true){
      this.dataSource.map(unit => {
        updatedDatasource.push({
          _id: unit._id,
          is_customer_show: unit._id == value ? true : false,
          item_quantity: unit.item_quantity, 
          price: unit.price,
          unit_id: unit.unit_id ? unit.unit_id._id : ''
        })
      })
    }else{
      this.dataSource.map(unit => {
        updatedDatasource.push({
          _id: unit._id,
          is_customer_show: unit.is_customer_show,
          item_quantity: unit.item_quantity, 
          price: unit.price,
          unit_id: unit.unit_id ? unit.unit_id._id : ''
        })
      })
    }

    let body:updateItemDepoPrice = {
      item_id:updatedata._id,
      position:updatedata.position,
      is_active:updatedata.is_active,
      availability_status:updatedata.availability_status,
      item_units:updatedDatasource,
      user_id:this.searchUserId,
    }
    this.facade.updateItemDepoPrice(body);
    this.isAnyChange = true;
  }

}
