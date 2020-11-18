import { itemDetail, itemList, itemListResponse } from './../entities/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemStateService {

  private items:BehaviorSubject<itemListResponse> = new BehaviorSubject({});
  private editItem:BehaviorSubject<itemDetail> = new BehaviorSubject({});
  private itemTypes:BehaviorSubject<string[]> = new BehaviorSubject(['SELLABLE','PACKAGING_MATERIAL','RAW_MATERIAL'])

  constructor() { }

  public getItemList():Observable<itemListResponse>{
    return this.items.asObservable();
  }

  public setItemList(itemList:itemListResponse){
    this.items.next(itemList);
  }

  public getEditItem():Observable<itemDetail>{
    return this.editItem.asObservable();
  }

  public setEditItem(item:itemDetail){
    this.editItem.next(item);
  }

  public getItemTypes(){
    return this.itemTypes.asObservable()
  }
}
