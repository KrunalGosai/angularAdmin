import { ToastrService } from 'ngx-toastr';
import { ItemStateService } from './state/item-state.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemApiService } from './api/item-api.service';
import { itemList } from './entities';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacadeService {

  constructor(private api:ItemApiService, private state:ItemStateService, private toster: ToastrService) { }

  public loadItemList(currentPage = 1,currentPageSize = 200, searchItemType= ''){
    this.api.getItemList(currentPage,currentPageSize,searchItemType).subscribe(items => {
      this.state.setItemList(items);
    },err => console.error('api call error from load items ',err))
  }


  public getItemList(){
    return this.state.getItemList().pipe(tap(cate => cate))
  }


  public newItem(newitem){
    return this.api.newitem(newitem).toPromise().then( res => {
      this.loadItemList();
      this.toster.success('Item Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Item ',err); throw err })
  }

  public deleteItem(itemId){
    return this.api.deleteItem(itemId).toPromise().then(res => {
      this.toster.success('Item Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Item',err); throw err })
  }

  public getItemDetails(){
    return this.state.getEditItem().pipe(tap(item => item))
  }

  public loadItemDetails(itemId){
    return this.api.getItemDetailsById(itemId).toPromise().then(res => {
      this.state.setEditItem(res.item)
      return res
    }).catch(err => {console.error('api call error from load Item Details',err); throw err });
  }

  public updateItem(item){
    return this.api.updateItem(item).toPromise().then( res => {
      this.loadItemList();
      this.toster.success('Item Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update item ',err); throw err })
  }

  public changeActivationStatus(row:itemList){
    return this.api.updateActivationStatus(row.is_active,row._id).toPromise().then(res => {
      this.toster.success('Unit Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Unit',err ); throw err  })
  }

  public getItemTypes(){
    return this.state.getItemTypes().pipe(tap(item => item))
  }
}
