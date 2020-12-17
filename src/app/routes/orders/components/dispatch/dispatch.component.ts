import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrdersFacadeService } from './../../orders-facade.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UnitesFacadeService } from 'app/routes/unites/unites-facade';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersDispatchComponent implements OnInit {

  public viewData:any = {};
  displayedColumns: string[] = ["item_id","item_unit_id","item_quantity","controls"];
  // dataSource = [];
  tableSource:MatTableDataSource<any>;
  // dispatchFrom: FormGroup;
  itemList = [];
  unitList = [];
  allUnitList = [];

  constructor(
    private toster: ToastrService,
    private facade:OrdersFacadeService,
    private confirmService:ConfirmService,
    private unitFacade:UnitesFacadeService,
    private sidebarNoticeService: SidebarNoticeService,
    private itemFacade:ItemsFacadeService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder) {
    // this.dispatchFrom = this.fb.group(
    //   {
    //     item_id : ['',[Validators.required]], 
    //     item_quantity:[0],
    //     item_unit_id :['',[Validators.required]], 
    //   });
   }

  //  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
  dataSource: MatTableDataSource<any>;
  dispatchData: any[] = [];
  itemData: any[] = [];
  columnsToDisplay = ['item_name'];
  innerDisplayedColumns = ['item_unit_id','item_quantity','control'];
  expandedElement: any | null;
  
  ngOnInit(): void {
    this.facade.getViewData().subscribe(row => {
      this.viewData = row;
    })
    this.loadDropdowns();
    this.viewData.items.forEach(item => {
      let itemobj = {item_id: item.item_id._id, item_name:item.item_name,qty:item.booked_item_quantity,unit:item.item_unit_id.name}
        this.itemData = [...this.itemData, itemobj];
    });
    this.dataSource = new MatTableDataSource(this.itemData);
  }

  getItemItemUnits(itemId){
    return this.dispatchData.filter(item => item.item_id == itemId);
  }

  toggleRow(element: any) {
    element.addresses && (element.addresses as MatTableDataSource<any>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<any>).sort = this.innerSort.toArray()[index]);
  }

  // public onFormSubmit(event){
  //   if(!this.dispatchFrom.valid) return;
  //   let value = this.dispatchFrom.value;
  //   // this.dataSource.push(value);
  //   this.dispatchFrom.reset();
  //   this.reloadTable();
  // }

  private loadDropdowns(){
    // this.itemFacade.getItemList().subscribe(items => {
    //   this.itemList = items.data;
    // })
    this.unitFacade.getUnites().subscribe(units => {
      this.allUnitList = units.data;
    })
  }

  // public reloadTable(){
  //   // this.tableSource = new MatTableDataSource(this.dataSource);
  // }

  public deleteIcon(row){
    console.log(row);
    let ind = this.dispatchData.indexOf(row);
    if(ind != -1){
      let data = [...this.dispatchData];
      data.splice(ind,1);
      this.dispatchData = [...data];
    }
  }

  public readyFroDispatch(){
    if(!this.validateBeforeDispatch()) return;
    let body = {
      items: this.dispatchData,
      order_id: this.viewData._id,
      status: "READY_FOR_DISPATCH",
    }
    this.facade.setReadyForDispatch(body).then(res => {
      // this.dispatchFrom.reset();
      // this.dataSource = [];
      this.sidebarNoticeService.setIsOpened(false);
    })
  }

  addItemUnit(item,qty,unit){
    item.item_quantity = Number.parseInt(item.item_quantity);
    if(!item.item_id || item.item_quantity <= 0 || item.item_unit_id == ''){
      this.toster.error('All fields are required !','Error',{timeOut:3000})
      return;
    }

    qty.value = 0;
    unit.value = '';
    
    this.dispatchData.push(item)
    console.log(this.dispatchData);
  }


  validateBeforeDispatch(){
    if(!this.dispatchData || this.dispatchData.length <= 0){
      this.toster.error('Order not fulfilled!','Error',{timeOut:3000})
      return false;
    }
    let result = true;
    let orderItems = this.viewData.items;
    let units = [...this.allUnitList];
    for (let index = 0; index < orderItems.length; index++) {
      const orderItem = orderItems[index];
      console.log(orderItem);
      let id = orderItem.item_id._id;
      let unitId = orderItem.item_unit_id._id;
      let orderqty = orderItem.booked_item_quantity;

      let dispatchcount = 0;
      let dispatchcart = [];
      for (let indexj = 0; indexj < this.dispatchData.length; indexj++) {
        const row = this.dispatchData[indexj];
        if(row.item_id == id){
          
          //check Unit
          if(unitId != row.item_unit_id){
            this.toster.error('Order Units not matched!','Error',{timeOut:3000})
            result = false;
            break;
          }
          
          //count items;
          dispatchcount += row.item_quantity;
          return row;
        }
        
      }
      

      if(dispatchcart.length <= 0){
        this.toster.error('Order not fulfilled!','Error',{timeOut:3000})
        result = false;
        break;
      }

      if(orderqty != dispatchcount){
        this.toster.error('Order Quantites not matched!','Error',{timeOut:3000})
        result = false;
        break
      }

      return result;
      
    }
  }

}
