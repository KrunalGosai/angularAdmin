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

  constructor(private fb: FormBuilder,
    private categoryFacade:CategoriesFacadeService) {

      this.categoryForm = this.fb.group({
        name: ['', [Validators.required]],
        parent: [''],
        category_img: [''],
        category_img_name: [''],
        img_file:[null]
      });

    }

  ngOnInit() {
    this.categoryFacade.getCategories().subscribe(cate => {
      this.categoryList = cate;
    })
  }

  fileUpladChange(event){
    let files:File[] = event.target.files;
    if(files && files != null && files.length > 0){
      let singleFile = files[0];
      this.categoryForm.get('category_img_name').setValue(singleFile.name);
    }else{
      this.categoryForm.get('category_img_name').reset();
    }
    
  }



}
