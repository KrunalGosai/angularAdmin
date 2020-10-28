import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getAllCategories(currentPage = 1,currentPageSize = 5,paretCategoryId = '', categoryName = ''){
    let url = this.baseURl+`/api/category/allCategoryList?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(paretCategoryId != undefined && paretCategoryId !=  null && paretCategoryId.trim() != '')
      url += `&paretCategoryId=${paretCategoryId}`;
    if(categoryName != undefined && categoryName !=  null && categoryName.trim() != '')
      url += `&searchByName=${categoryName}`;
    return this.http.get(url);
  }

  public getParentCategories(){
    let url = this.baseURl+ `/api/category`;
    return this.http.get(url);
  }

  public newCategory(category){
    let url = this.baseURl + '/api/category/add';
    let formData = new FormData();
    formData.append('name',category.name);
    formData.append('parent_categoriesId',category.parent);
    formData.append('is_active',category.isactive);
    formData.append('category_sort',category.sort);
    formData.append('category_image',category.category_image);

    console.log('form data ',formData);

    let body = {
      name: category.name,
      parent_categoriesId: category.parent,
      is_active: category.isactive,
      category_sort:category.sort,
      category_image:category.category_image
    }

    return this.http.post(url,body);
  }

  public deleteCategory(categoryId){
    let url = this.baseURl+`/api/category/deleteCategory/${categoryId}`;
    return this.http.delete(url);
  }

  public getCategoryDetailsById(categoryId){
    let url = this.baseURl+`/api/category/categoryDetails/${categoryId}`;
    return this.http.get(url);
  }

  public updateCategory(category){
    let url = this.baseURl+`/api/category/${category.id}`;
    let body = {
      name: category.name,
      parent_categoriesId: category.parent,
      is_active: category.isactive,
      position:category.sort,
      category_image:category.category_image
    }
    return this.http.put(url,body);
  }

  public changeActivationStatus(categoryId:string,isActive:boolean){
    let url = this.baseURl+`/api/category/changeCategoryStatus/${categoryId}`
    let body = {is_active:isActive};
    return this.http.put(url,body)
  }
}