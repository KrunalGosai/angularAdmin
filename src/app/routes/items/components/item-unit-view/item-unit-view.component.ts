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
  public favoriteSeason = '';


  ngOnInit(): void {
    this.dataSource =  this.data.all_item_units || [];
  }

  changePrice(){
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

}
