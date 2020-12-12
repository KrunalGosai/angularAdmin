import { ProcessingFacadeService } from './../../processing-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { UnitesFacadeService } from 'app/routes/unites/unites-facade';

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
  production:any[] = [];
  productionColumn:string[] = ["consumed_unit_id","consumed_quantity","controls"]
  processingUnits:any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private itemFacade: ItemsFacadeService,
    private unitFacade: UnitesFacadeService,
    private facade: ProcessingFacadeService,
  ) {
    this.processingForm = this.fb.group({
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
        wastage_unit_id:["",[Validators.required]],
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
      // this.facade.getOfferDetails(this.activeEditId).subscribe(
      //   (res) => {
      //     let offer: any = { ...res };
      //     console.log(offer)
      //     this.processingForm.patchValue(offer);
      //     this.processingForm.patchValue({ user_role: offer.user_role && offer.user_role.length > 0 ? offer.user_role[0]:'',
      //     expiry:new Date(offer.expiry)
      //    });
      //    this.offerTypeChanged();
      //   },
      //   (err) => console.error(err)
      // );
    }
    this.loadDropdowns()
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
  }

  // public itemTypeChanged(){
  //   let value = this.processingForm.get('item_type').value;
  //   this.getItemList(value);
  // }

  // public getItemList(type:string){
  //   if(type == "SELLABLE")
  //     this.itemList = [...this.sellableItemList];
  //   else if(type == "RAW_MATERIAL")
  //     this.itemList = [...this.rawItemList];
  // }

  get isSallable(){
    return this.processingForm.get('item_type').value == "SELLABLE";
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
    this.processingUnits = [this.processingForm.value];
    // this.processingForm.reset();
    this.onFormSubmit(null);
  }

  public onProductionFormSubmit(event){
    if(!this.productionForm.valid) return;
    let oldValue:any = this.processingForm.get('production_unit_ids').value || [];
    let value = this.productionForm.value;
    let newValue = [...oldValue];
    newValue.push(value);
    this.processingForm.get('production_unit_ids').setValue(newValue);
    this.productionForm.reset();
  }

  public onPackingFormSubmit(event){
    if(!this.packingForm.valid) return;
    let oldValue:any = this.processingForm.get('packaging_material').value || [];
    let value = this.packingForm.value;
    let newValue = [...oldValue];
    newValue.push(value);
    this.processingForm.get('packaging_material').setValue(newValue);
    this.packingForm.reset();
  }


  public onFormSubmit(event) {
    console.log("form value ", this.processingForm.value, this.processingForm.valid);
    if (!this.processingUnits && this.processingUnits.length <= 0) return;
    if (this.isEditMode) {
      let value = this.processingForm.value;
      value._id = this.activeEditId;
      // this.facade.updateOffer(value).then((res) => {
      //   this.processingForm.reset();
      //   this.router.navigate(["offers"]);
      // });
    } else {
      let body = {items:[...this.processingUnits]}
      this.facade.newProcessingUnit(body).then((res) => {
        this.facade.loadProcessingUnitsList();
        this.processingForm.reset();
        this.router.navigate(["processing-units"]);
      });
    }
  }

}
