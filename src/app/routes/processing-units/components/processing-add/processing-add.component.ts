import { unit } from './../../../unites/entities/index';
import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { ProcessingFacadeService } from './../../processing-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { UnitesFacadeService } from 'app/routes/unites/unites-facade';
import { UsersFacade } from 'app/routes/users/users-facade';
import { UserRole } from '@shared/entities';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-processing-units-components-processing-add',
  templateUrl: './processing-add.component.html',
  styleUrls: ['./processing-add.component.scss']
})
export class ProcessingUnitsComponentsProcessingAddComponent implements OnInit {

  //dropdown lists
  itemList:any[] = [];
  packingItemList:any[] = [];
  unitList:any[] = [];
  sellableItemList:any[] = [];
  rawItemList:any[] = [];
  roleList = [];
  userList = [];
 
  //forms
  processingForm: FormGroup;
  productionForm: FormGroup;
  packingForm: FormGroup;

  //edit 
  isEditMode: Boolean = false;
  activeEditId: string = "";

  //tables 
  packagingMaterial:any[] = [];
  packagingMaterialColumn:string[] = ["item_id","consumed_unit_id","consumed_quantity","wastage_unit_id","wastage_quantity", "controls"]
  packagingMaterialSource:MatTableDataSource<any>;
  production:any = [];
  productionSource:MatTableDataSource<any>;
  productionColumn:string[] = ["consumed_unit_id","consumed_quantity","controls"]
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingSvc: SettingsService,
    private activeRoute: ActivatedRoute,
    private itemFacade: ItemsFacadeService,
    private unitFacade: UnitesFacadeService,
    private usersFacade: UsersFacade,
    private facade: ProcessingFacadeService,
  ) {
    this.processingForm = this.fb.group({
        role_id:[''],
        user_id:[''],
        item_type:["",[Validators.required]],
        raw_item_id:[""],
        sellable_item_id:[""],
        consumed_unit_id:[""],
        consumed_quantity:[0],
        wastage_unit_id:[""],
        wastage_quantity:[0],
        production_unit_ids:[[]],
        packaging_material:[[]]
      });

    this.productionForm = this.fb.group({
        unit_id:["",[Validators.required]],
        production_quantity:[0]
    })

    this.packingForm = this.fb.group({
        item_id:["",[Validators.required]],
        consumed_unit_id:["",[Validators.required]],
        consumed_quantity:[0],
        wastage_unit_id:[""],
        wastage_quantity:[0]
    })

    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
  }

  ngOnInit() {
    
    if (this.isEditMode) {
      this.facade.getProcessingUnitDetail(this.activeEditId).subscribe(
        (res) => {
          let data: any = { ...res };
          let item = data;
          this.production = this.productionEditList(item.production_unit_ids);
          this.packagingMaterial = this.packingEditList(item.packaging_material);
          this.processingForm.patchValue({
            user_id:data.user_id,
            item_type:item.raw_item_id ? 'RAW_MATERIAL' : 'SELLABLE',
            raw_item_id:item.raw_item_id ? item.raw_item_id : '',
            sellable_item_id:item.sellable_item_id ? item.sellable_item_id : '',
            consumed_unit_id:item.consumed_unit_id ? item.consumed_unit_id : '',
            consumed_quantity:item.consumed_quantity,
            wastage_unit_id:item.wastage_unit_id ? item.wastage_unit_id : '',
            wastage_quantity:item.wastage_quantity,
            production_unit_ids:this.production,
            packaging_material:this.packagingMaterial
          });
          this.reloadProductionTable();
          this.reloadPackingTable()
        },(err) => console.error(err)
      );
    }
    this.loadDropdowns()
  }

  private productionEditList(sourceList){
    if(!sourceList || sourceList.length <= 0) return [];
    let list = [];
    sourceList.map(item => {
      list.push({
        unit_id:item.unit_id ? item.unit_id : '',
        production_quantity: item.production_quantity
      })
    })
    return list;
  }

  private packingEditList(sourceList){
    if(!sourceList || sourceList.length <= 0) return [];
    let list = [];
    sourceList.map(item => {
      list.push({
        item_id:item.item_id ? item.item_id : '',
        consumed_unit_id:item.consumed_unit_id ? item.consumed_unit_id : '',
        consumed_quantity:item.consumed_quantity,
        wastage_unit_id:item.consumed_unit_id ? item.consumed_unit_id : '',
        wastage_quantity:item.wastage_quantity
      })
    })
    return list;
  }

  private loadDropdowns(){
    
    this.unitFacade.getUnites().subscribe(list => {
      this.unitList = list.data;
    })
    this.itemFacade.getPackagingItemList().subscribe(list => {
      this.packingItemList = list.data;
    })
    this.itemFacade.getSallableItemList().subscribe(list => {
      this.sellableItemList = list.data;      
    })
    this.itemFacade.getRawItemList().subscribe(list => {
      this.rawItemList = list.data;
      this.itemList = this.rawItemList;
    })
    if(this.isAdmin){
      this.usersFacade.getRoleList().subscribe(res => {
        let roles:any = res;
        this.roleList = roles.data.filter(role => role.type == UserRole.DEPO || role.type == UserRole.HAWKER || role.type == UserRole.FRANCHISE || role.type == UserRole.RETAILERS || role.type == UserRole.MANUFACTURING_PLANT);
      })
    }
  }

  get isSallable(){
    return this.processingForm.get('item_type').value == "SELLABLE";
  }

  get isAdmin(){
    return this.settingSvc.isAdmin;
  }

  get isRetailer(){
    return this.settingSvc.isRetailer || this.processingForm.get('role_id').value == UserRole.RETAILERS;
  }

  public roleChanged(){
    this.userList = [];
    if(this.isAdmin){
      let value = this.processingForm.get('role_id').value;
      this.usersFacade.getUsersByType(0,0,'',value).subscribe(users => {
        this.userList = users.userList;
      })
    }
  }

  public getUnit(id){
    if(!this.unitList || this.unitList.length <= 0 ) return ''
    let unit = this.unitList.filter(unit => unit._id == id);
    if(unit && unit.length> 0) return unit[0].name;
    else return ''
  }

  public getItem(id){
    if(!this.packingItemList || this.packingItemList.length <= 0 ) return ''
    let items = this.packingItemList.filter(items => items._id == id);
    if(items && items.length> 0) return items[0].name;
    else return ''
  }

  public onProcessingFormSubmit(event){
    if (!this.processingForm.valid){
      if(this.isSallable){
        if(this.processingForm.get('item_type').valid && this.processingForm.get('sellable_item_id').valid
            && this.processingForm.get('wastage_unit_id').valid && this.processingForm.get('wastage_quantity').valid){}
        else{
          return
        }
      }else{
        return;
      }
    }
    this.processingForm.get('production_unit_ids').setValue(this.production);
    this.processingForm.get('packaging_material').setValue(this.packagingMaterial);
    this.processingForm.value;
    // this.processingForm.reset();
    this.onFormSubmit(null);
  }

  public onProductionFormSubmit(event){
    if(!this.productionForm.valid) return;
    let oldValue:any = this.production;
    let value = this.productionForm.value;
    let unit = {...value.unit_id};
    if(unit.packaging_material_consumed && unit.packaging_material_consumed.length > 0){
      unit.packaging_material_consumed.map(item => {
        this.packagingMaterial.push({
          item_id:item.item_id,
          consumed_unit_id:item.item_unit_id,
          consumed_quantity:(item.item_quantity * value.production_quantity),
        })
      })
    }
    value.unit_id = unit._id;
    let newValue = [...oldValue];
    newValue.push(value);
    this.production = newValue;
    this.reloadProductionTable();
    this.reloadPackingTable();
    this.productionForm.reset();
  }

  public onPackingFormSubmit(event){
    if(!this.packingForm.valid) return;
    let oldValue:any = this.packagingMaterial;
    let value = this.packingForm.value;
    value.wastage_unit_id = value.wastage_unit_id == '' ? null : value.wastage_unit_id;
    let newValue = [...oldValue];
    newValue.push(value);
    this.packagingMaterial = newValue;
    this.reloadPackingTable();
    this.packingForm.reset();
  }

  public onFormSubmit(event) {
    // if (!this.processingUnits && this.processingUnits.length <= 0) return;
    let body:any = this.processingForm.value; //{items:[...this.processingUnits]}
    if(body.raw_item_id == "") body.raw_item_id = null;
    if(body.consumed_unit_id == "") body.consumed_unit_id = null;
    if(body.wastage_unit_id == "") body.wastage_unit_id = null;

    if (this.isEditMode) {
      body.processing_id = this.activeEditId;
      this.facade.newProcessingUnit(body).then((res) => {
        this.processingForm.reset();
        this.router.navigate(["processing-units"]);
      });
    } else {
      this.facade.newProcessingUnit(body).then((res) => {
        this.facade.loadProcessingUnitsList();
        this.processingForm.reset();
        this.router.navigate(["processing-units"]);
      });
    }
  }

  public deleteProductionItem(ind){
    let data = [...this.production];
    data.splice(ind,1);
    this.production = [...data];
    this.reloadProductionTable();
  }

  public deletePackagingItem(ind){
    let data = [...this.packagingMaterial];
    data.splice(ind,1);
    this.packagingMaterial = [...data];
    this.reloadPackingTable();
  }

  reloadProductionTable(){
    this.productionSource = new MatTableDataSource(this.production);
  }

  reloadPackingTable(){
    this.packagingMaterialSource = new MatTableDataSource(this.packagingMaterial);
  }
}
