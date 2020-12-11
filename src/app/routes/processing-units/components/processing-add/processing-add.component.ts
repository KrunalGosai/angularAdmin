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
 
  //forms
  processingForm: FormGroup;
  productionForm: FormGroup;
  packingForm: FormGroup;

  //edit 
  isEditMode: Boolean = false;
  activeEditId: string = "";

  //tables 
  packagingMaterial:any[] = [];
  packagingMaterialColumn:string[] = ["item_id","consumed_unit_id","consumed_quantity","wastage_unit_id","wastage_quantity"]
  production:any[] = [];
  productionColumn:string[] = ["consumed_unit_id","consumed_quantity"]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private itemFacade: ItemsFacadeService,
    private unitFacade: UnitesFacadeService,
    private facade: ProcessingFacadeService,
  ) {
    this.processingForm = this.fb.group({
        item_type:[""],
        raw_item_id:["",[Validators.required]],
        consumed_unit_id:["",[Validators.required]],
        consumed_quantity:[0],
        wastage_unit_id:["",[Validators.required]],
        wastage_quantity:[0]
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
    this.getItemList("RAW_MATERIAL");
  }

  public itemTypeChanged(){
    let value = this.processingForm.get('item_type').value;
    this.getItemList(value);
  }

  public getItemList(type:string){
    this.itemFacade.getItemList(0,0,type).subscribe(list => {
      this.itemList = list.data;      
    })
  }


  public onFormSubmit(event) {
    console.log("form value ", this.processingForm.value, this.processingForm.valid);
    if (!this.processingForm.valid) return;
    if (this.isEditMode) {
      let value = this.processingForm.value;
      value._id = this.activeEditId;
      // this.facade.updateOffer(value).then((res) => {
      //   this.processingForm.reset();
      //   this.router.navigate(["offers"]);
      // });
    } else {
      // this.facade.newOffer(this.processingForm.value).then((res) => {
      //   this.processingForm.reset();
      //   this.router.navigate(["offers"]);
      // });
    }
  }

}
