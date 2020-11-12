import { CategoriesFacadeService } from './../../../categories/categories-facade';
import { ItemsFacadeService } from './../../items-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-components-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemsComponentsItemAddComponent implements OnInit {

  categoryList: any[];
  itemForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = '';

  constructor(private fb: FormBuilder,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private facade:ItemsFacadeService,
    private categoryFacade:CategoriesFacadeService) {

      this.itemForm = this.fb.group({
        name: ['', [Validators.required]],
        secondary_name: [''],
        price:[0],
        is_active: [false],
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
    this.categoryFacade.getParentCategories().subscribe(parent => {
      this.categoryList = parent;
    })
    if(this.isEditMode){
      this.facade.getItemDetails().subscribe(res => {
        // let category:any = res.category_id;
        // this.itemForm.patchValue({
        //   name:res.name,
        //   banner_image_url: res.banner_image_url,
        //   banner_redirect_url: res.banner_redirect_url,
        //   is_active: res.is_active,
        //   type: res.type,
        //   category_id: category._id,
        //   position:res.position
        // })
      },err => console.error(err))
    }
  }

  public onFormSubmit(event){
    // console.log('form value ', this.itemForm.value,this.itemForm.valid,this.itemForm)
    if(!this.itemForm.valid) return;
    if(this.isEditMode){
      let value = this.itemForm.value;
      value._id = this.activeEditId;
      // this.facade.updateBanner(value).then(res => {
      //   this.itemForm.reset();
      //   this.router.navigate(['banners'])
      // })
    }else{
      // this.facade.newBanner(this.itemForm.value).then(res => {
      //   this.itemForm.reset();
      //   this.router.navigate(['banners'])
      // })
    }
  }

}
