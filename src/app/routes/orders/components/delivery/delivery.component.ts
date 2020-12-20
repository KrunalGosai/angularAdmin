import { element } from 'protractor';
import { unit } from 'app/routes/unites/entities';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersFacadeService } from './../../orders-facade.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-orders-components-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponentsDeliveryComponent implements OnInit {

  constructor(
    private facade:OrdersFacadeService,
    private rotuer:Router,
    private cd: ChangeDetectorRef) { }

  public deliveryData:any = {};

  dataSource: MatTableDataSource<any>;
  tableData:any[] = [];
  columnsToDisplay = ['item_name','booked_item_quantity','item_quantity','weight_item_quantity','item_unit_id','loss_in_transit','scaling_loss','wastage_item_quantity','wastage_reason'];
  innerDisplayedColumns = ['item_unit_id','item_quantity','control'];
  expandedElement: any | null;

  ngOnInit() {
    this.facade.getDeliveryData().subscribe(row => {
      this.deliveryData = row;
      if(this.deliveryData == {})
      this.rotuer.navigate(['/orders/PURCHASE_ORDER'])
      // this.tableData = [...this.deliveryData.items];
      this.deliveryData.items.map(item => {
        this.tableData.push({
          row:item,
          _id:item._id,
          item_id :item.item_id, 
          item_name : item.item_name,
          booked_item_quantity :item.booked_item_quantity,
          item_quantity :0,
          weight_item_quantity :0,
          item_unit_id :item.item_unit_id, 
          wastage_item_quantity : 0,
          wastage_reason :"",
          scaling_loss : 0,
          loss_in_transit : 0
        })
      })      
    })
    this.reloadTableData();
  }

  private reloadTableData(){
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  getItemUnits(itemId){
    return this.tableData.filter(item => item.item_id == itemId);
  }

  toggleRow(element: any) {
    element.addresses && (element.addresses as MatTableDataSource<any>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  getBaseUnit(unitObj){
    let result = ''
    //get unit name;
    if(unitObj.name)
      result = unitObj.name;

    // check unit has base unit;
    if(unitObj.base_unit && unitObj.base_unit.name)
      result = unitObj.base_unit.name;
    return result;
  }

  public quantityChange(element){
    element.loss_in_transit = element.booked_item_quantity - element.item_quantity;
    this.reloadTableData();
  }

  public weightChange(element){
    let weight = 0

    weight = element.item_quantity;

    if(element.item_unit_id.base_unit && element.item_unit_id.base_unit.name)
      weight = element.item_unit_id.base_quantity * element.booked_item_quantity;
    
    element.scaling_loss = weight - element.weight_item_quantity;

    this.reloadTableData();
  }

  onReceived(){
    console.log({
      order_id:this.deliveryData._id,
      items:this.tableData
    })
  }

}
