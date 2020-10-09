import { ToastrService } from 'ngx-toastr';
import { tap, subscribeOn } from 'rxjs/operators';
import { CategoriesApiService } from './api/categories-api.service';
import { Injectable } from '@angular/core';
import { CategoriesStateService } from './state/categories-state.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFacadeService {

  constructor(private api:CategoriesApiService, private state:CategoriesStateService, private toster: ToastrService) { }

  public loadCategories(currentPage = 1,currentPageSize = 5,paretCategoryId = ''){
    this.api.getAllCategories(currentPage,currentPageSize,paretCategoryId).subscribe(cate => {
      let data:any = cate;
      this.state.setCategories(data.data);
    },err => console.error('api call error from load categories ',err))
  }

  public loadParentCategories(){
    this.api.getParentCategories().subscribe(parent => {
      let data:any = parent
      this.state.setParentCategories(data.data.categories);
    },err => console.error('api call error from load parent categories ',err))
  }

  public getCategories(){
    return this.state.getCategories().pipe(tap(cate => cate))
  }

  public getParentCategories(){
    return this.state.getParentCategories().pipe(tap(cate => cate))
  }

  public newCategory(category){
    return this.api.newCategory(category).toPromise().then( res => {
      this.loadCategories();
      this.toster.success('Category Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new category ',err); return err })
  }

  public deleteCategory(categoryId){
    return this.api.deleteCategory(categoryId).toPromise().then(res => {
      this.toster.success('Category Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete category ',err); return err })
  }

  public getCategoryDetails(categoryId){
    return this.api.getCategoryDetailsById(categoryId).toPromise();
  }

  public updateCategory(category){
    return this.api.updateCategory(category).toPromise().then( res => {
      this.loadCategories();
      this.toster.success('Category Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update category ',err); return err })
  }
}
