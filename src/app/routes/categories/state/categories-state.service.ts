import { category, categoryDetail, categoryListResponse } from './../entities/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStateService {
  private categories:BehaviorSubject<categoryListResponse> = new BehaviorSubject({});
  private parentCategories:BehaviorSubject<any> = new BehaviorSubject([]);
  private editCategory:BehaviorSubject<categoryDetail> = new BehaviorSubject({});

  constructor() { }

  public getCategories():Observable<categoryListResponse>{
    return this.categories.asObservable();
  }

  public setCategories(categories){
    this.categories.next(categories);
  }

  public getParentCategories(){
    return this.parentCategories.asObservable();
  }

  public setParentCategories(categories){
    this.parentCategories.next(categories);
  }

  public getEditCategory():Observable<categoryDetail>{
    return this.editCategory.asObservable();
  }

  public setEditCategory(category:categoryDetail){
    this.editCategory.next(category);
  }
}
