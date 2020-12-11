import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OfferFacadeService } from '../../offer-facade.service';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { CategoriesFacadeService } from 'app/routes/categories/categories-facade';
import { UsersFacade } from 'app/routes/users/users-facade';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-offers-components-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss']
})
export class OffersComponentsOfferAddComponent implements OnInit {

  offerTypeList:any[] = [{name:"Order",value:"ORDER"},{name:"Category",value:"CATEGORY"},{name:"Item",value:"ITEM"},{name:"Age",value:"AGE"},{name:"Gender",value:"GENDER"}]
  offerOnItem:any[] = [];
  usersList = [];
  categoryList: any[];
  itemTypeList: string[];
  offerForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";
  minDate;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private facade: OfferFacadeService,
    private categoryFacade: CategoriesFacadeService,
    private itemFacade: ItemsFacadeService,
    private userFacade: UsersFacade,
  ) {
    this.offerForm = this.fb.group(
      {
        "offer_type":["",[Validators.required]],
        "offer_on_ids":[],
        "min_value":[0,[Validators.required]],
        "discount_type":["",[Validators.required]],
        "discount_value":[0,[Validators.required]],
        "position":[1],
        "coupon_code":[""],
        "expiry":['',[Validators.required]],
        "user_id":[],
        "user_role":[""],
        "is_active":[true],
        "age":[0],
        "gender":[""],  
        "usage_count":[1]    
      });
    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
    let today = new Date();
    this.minDate = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
  }

  ngOnInit() {
    // this.categoryFacade.loadParentCategories();
    // this.unitFacde.loadUnites(1, 500);
    // this.categoryFacade.getParentCategories().subscribe((parent) => {
    //   this.categoryList = parent;
    // });
    // this.categoryFacade.getCategoriesByParentId().subscribe((categories) => {
    //   this.subCategoryList = categories.data;
    // });
    // this.unitFacde.getUnites().subscribe((units) => {
    //   this.unitList = units.data;
    // });
    // this.facade.getItemTypes().subscribe((types) => {
    //   this.itemTypeList = types;
    // });
    // this.facade.getSallableItemList().subscribe((types) => {
    //   this.recommendedList = types.data;
    // });
    if (this.isEditMode) {
      this.facade.getOfferDetails(this.activeEditId).subscribe(
        (res) => {
          let offer: any = { ...res };
          console.log(offer)
          this.offerForm.patchValue(offer);
          this.offerForm.patchValue({ user_role: offer.user_role && offer.user_role.length > 0 ? offer.user_role[0]:'',
          expiry:new Date(offer.expiry)
         });
         this.offerTypeChanged();
        },
        (err) => console.error(err)
      );
    }
  }

  get isTypeItemCategory(){
    return this.offerForm.get('offer_type').value == "ITEM" || this.offerForm.get('offer_type').value == "CATEGORY";
  }
  get isOrderType(){
    return this.offerForm.get('offer_type').value == "ORDER"
  }
  get isAgeType(){ return this.offerForm.get('offer_type').value == "AGE"}
  get isGenderType(){ return this.offerForm.get('offer_type').value == "GENDER"}
  get is_active_value() {
    return this.offerForm.get("is_active").value
      ? this.offerForm.get("is_active").value
      : false;
  }

  public userRoleChanged(){
    this.usersList = [];
    let value = this.offerForm.get('user_role').value
    this.userFacade.getUsers(0,0,'',value).subscribe(users => {
      this.usersList = users.userList;
    },err => console.error(err))
  }

  public offerTypeChanged(){
    let value = this.offerForm.get('offer_type').value;
    this.offerOnItem = [];
    switch (value.toUpperCase()) {
      case "ITEM":
        this.itemFacade.getItemList().subscribe(items => {
          this.offerOnItem = items.data;
        },err => console.error(err))
        break;
      case "CATEGORY":
        this.categoryFacade.getCategories().subscribe(cate => {
          this.offerOnItem = cate.data
        },err => console.error(err))
        break;
      default:
        break;
    }
  }


  public onFormSubmit(event) {
    console.log("form value ", this.offerForm.value, this.offerForm.valid);
    if (!this.offerForm.valid) return;
    if (this.isEditMode) {
      let value = this.offerForm.value;
      value._id = this.activeEditId;
      this.facade.updateOffer(value).then((res) => {
        this.offerForm.reset();
        this.router.navigate(["offers"]);
      });
    } else {
      this.facade.newOffer(this.offerForm.value).then((res) => {
        this.offerForm.reset();
        this.router.navigate(["offers"]);
      });
    }
  }

  ///chips stuff
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // addtag(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   let cate = [...this.offerForm.get("category_tags").value];

  //   // Add
  //   if ((value || "").trim()) {
  //     cate.push(value.trim());
  //     this.offerForm.get("category_tags").setValue(cate);
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = "";
  //   }
  // }

  // removetag(tag: string): void {
  //   let cate = [...this.offerForm.get("category_tags").value];
  //   const index = cate.indexOf(tag);

  //   if (index >= 0) {
  //     // this.categoryTags.splice(index, 1);
  //     cate.splice(index, 1);
  //     this.offerForm.get("category_tags").setValue(cate);
  //   }
  // }

  // addpic(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   let pictures = [...this.offerForm.get("picture").value];

  //   // Add
  //   if ((value || "").trim()) {
  //     pictures.push(value.trim());
  //     this.offerForm.get("picture").setValue(pictures);
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = "";
  //   }
  // }

  // removepic(pic: string): void {
  //   let pictures = [...this.offerForm.get("picture").value];
  //   const index = pictures.indexOf(pic);

  //   if (index >= 0) {
  //     // this.categoryTags.splice(index, 1);
  //     pictures.splice(index, 1);
  //     this.offerForm.get("picture").setValue(pictures);
  //   }
  // }

  cateTagValues: string[] = [];
  subCateTagValues: string[] = [];
  public onCategorySelectionChange() {
    this.cateTagValues = [];
    let cate_id = this.offerForm.get("category_id").value;
    this.categoryList.filter((item) => {
      if (cate_id == item._id) this.cateTagValues.push(item.name);
    });
    this.offerForm.patchValue({
      category_tags: [].concat(...this.cateTagValues),
    });
    this.offerForm.get("subCategory_ids").setValue([]);
    this.loadSubCategories(cate_id);
  }

  public onSubCategorySelectionChange() {
    this.subCateTagValues = [];
    let subcate_ids = this.offerForm.get("subCategory_ids").value;
    // this.subCategoryList.filter((item) => {
    //   if (subcate_ids.indexOf(item._id) >= 0)
    //     this.subCateTagValues.push(item.name);
    // });
    this.offerForm.patchValue({
      category_tags: [].concat(...this.cateTagValues, this.subCateTagValues),
    });
  }

  public loadSubCategories(parentId) {
    // this.categoryFacade.loadCategories(1, 200, parentId, "");
  }

}
