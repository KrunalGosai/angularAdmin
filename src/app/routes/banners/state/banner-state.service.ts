import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { bannerResponse } from '../Entities';

@Injectable({
  providedIn: 'root'
})
export class BannerStateService {
  private banners:BehaviorSubject<bannerResponse> = new BehaviorSubject({});
  // private parentCategories:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() { }

  public getBanner():Observable<bannerResponse>{
    return this.banners.asObservable();
  }

  public setBanner(banner:bannerResponse){
    this.banners.next(banner);
  }

  // public getParentCategories(){
  //   return this.parentCategories.asObservable();
  // }

  // public setParentCategories(categories){
  //   this.parentCategories.next(categories);
  // }
}
