import { tap } from 'rxjs/operators';
import { CategoriesApiService } from './api/categories-api.service';
import { Injectable } from '@angular/core';
import { CategoriesStateService } from './state/categories-state.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFacadeService {

  constructor(private api:CategoriesApiService, private state:CategoriesStateService) { }

  loadCategories(){
    this.api.getAllCategories().subscribe(cate => {
      this.state.setCategories(cate);
    })
  }

  public getCategories(){
    return this.state.getCategories().pipe(tap(cate => cate))
  }
}
