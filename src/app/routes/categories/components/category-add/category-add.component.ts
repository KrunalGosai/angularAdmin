import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesFacadeService } from './../../categories-facade';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-components-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoriesComponentsCategoryAddComponent implements OnInit {

  categoryList: any[];
  categoryForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = '';

  constructor(private fb: FormBuilder,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private categoryFacade:CategoriesFacadeService) {

      this.categoryForm = this.fb.group({
        name: ['', [Validators.required]],
        parent: [''],
        sort: [1],
        isactive: true,
        category_img: [''],
        category_img_name: [''],
        img_file:[null]
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
      this.categoryFacade.getCategoryDetails(this.activeEditId).then(res => {
        let data:any = res;
        data = data.categoryDetail;
        console.log({result:res})
        let cateParent = data.parent_categoriesIds.length > 0 ? data.parent_categoriesIds[0]: '';
        this.categoryForm.patchValue({
          name:data.name,
          parent: cateParent,
          category_img_name:data.category_image,
          isactive:data.is_active})
      }).catch(err => console.error(err))
    }
  }

  public fileUpladChange(event){
    let files:File[] = event.target.files;
    if(files && files != null && files.length > 0){
      let singleFile = files[0];
      this.categoryForm.get('category_img_name').setValue(singleFile.name);
      this.categoryForm.get('img_file').setValue(singleFile);
    }else{
      this.categoryForm.get('category_img_name').reset();
    }
  }

  public onFormSubmit(event){
    // console.log('form value ', this.categoryForm.value,this.categoryForm.valid,this.categoryForm)
    if(!this.categoryForm.valid) return;
    if(this.isEditMode){
      let value = this.categoryForm.value;
      value.id = this.activeEditId;
      this.categoryFacade.updateCategory(value).then(res => {
        this.categoryForm.reset();
        this.router.navigate(['categories'])
      })
    }else{
      this.categoryFacade.newCategory(this.categoryForm.value).then(res => {
        this.categoryForm.reset();
        this.router.navigate(['categories'])
      })
    }
  }



}
