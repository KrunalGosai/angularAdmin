import { CategoriesFacadeService } from './../../../categories/categories-facade';
import { ItemsFacadeService } from './../../items-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { category } from 'app/routes/categories/entities';
import { UnitesFacadeService } from 'app/routes/unites/unites-facade';
import { unit } from 'app/routes/unites/entities';

@Component({
  selector: 'app-items-components-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemsComponentsItemAddComponent implements OnInit {

  categoryList: any[];
  subCategoryList: category[];
  unitList:unit[];
  itemTypeList:string[];
  itemForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = '';

  constructor(private fb: FormBuilder,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private facade:ItemsFacadeService,
    private unitFacde:UnitesFacadeService,
    private categoryFacade:CategoriesFacadeService) {

      this.itemForm = this.fb.group({
        name: ['', [Validators.required]],
        secondary_name: [''],
        price:[0],
        is_active: [true],
        item_volume:[0],
        category_id:[''],
        unit_id:[''],
        item_type:[''],
        description:[''],
        benefits:[''],
        category_tags:[[]],
        thumbnail:[''],
        picture:[[]],
        recommended_items:[[]],
        subCategory_ids:[[]],
        
      });
      this.activeRoute.params.subscribe(params => {
        if(params.id != undefined && params.id != null && params.id != ''){
          this.isEditMode = true;
          this.activeEditId = params.id;
        }
      })
    
    }

  ngOnInit() {
    this.categoryFacade.loadParentCategories();
    this.categoryFacade.loadCategories(1,500);
    this.unitFacde.loadUnites(1,500)
    this.categoryFacade.getParentCategories().subscribe(parent => {
      this.categoryList = parent;
    })
    this.categoryFacade.getCategories().subscribe(categories => {
      this.subCategoryList = categories.data;
    })
    this.unitFacde.getUnites().subscribe(units => {
      this.unitList = units.data;
    })
    this.facade.getItemTypes().subscribe(types => {
      this.itemTypeList = types;
    })
    if(this.isEditMode){
      this.facade.getItemDetails().subscribe(res => {
        let item:any = {...res};
        this.itemForm.patchValue(res)
        this.itemForm.patchValue({item_type:item.type,recommended_items:item.recommended_items})

      },err => console.error(err))
    }
  }

  public onFormSubmit(event){
    console.log('form value ', this.itemForm.value,this.itemForm.valid)
    if(!this.itemForm.valid) return;
    if(this.isEditMode){
      let value = this.itemForm.value;
      value._id = this.activeEditId;
      this.facade.updateItem(value).then(res => {
        this.itemForm.reset();
        this.router.navigate(['items'])
      })
    }else{
      this.facade.newItem(this.itemForm.value).then(res => {
        this.itemForm.reset();
        this.router.navigate(['items'])
      })
    }
  }

  ///chips stuff
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addtag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let cate = [...this.itemForm.get('category_tags').value];

    // Add 
    if ((value || '').trim()) {
      cate.push(value.trim());
      this.itemForm.get('category_tags').setValue(cate)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removetag(tag:string): void {
    let cate = [...this.itemForm.get('category_tags').value];
    const index = cate.indexOf(tag);

    if (index >= 0) {
      // this.categoryTags.splice(index, 1);
      cate.splice(index,1);
      this.itemForm.get('category_tags').setValue(cate)
    }
  }

  addpic(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let pictures = [...this.itemForm.get('picture').value];

    // Add 
    if ((value || '').trim()) {
      pictures.push(value.trim());
      this.itemForm.get('picture').setValue(pictures)
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removepic(pic:string): void {
    let pictures = [...this.itemForm.get('picture').value];
    const index = pictures.indexOf(pic);

    if (index >= 0) {
      // this.categoryTags.splice(index, 1);
      pictures.splice(index,1);
      this.itemForm.get('picture').setValue(pictures)
    }
  }

}
