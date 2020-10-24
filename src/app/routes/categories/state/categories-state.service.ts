import { BehaviorSubject } from 'rxjs';
import { CategoriesApiService } from './../api/categories-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStateService {
  private categories:BehaviorSubject<any> = new BehaviorSubject({});
  private parentCategories:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() { }

  public getCategories(){
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
}
