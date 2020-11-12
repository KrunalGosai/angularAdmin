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

  public loadItemList(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getItemList(currentPage,currentPageSize,searchByName).subscribe(items => {
      this.state.setItemList(items);
    },err => console.error('api call error from load items ',err))
  }


  public getItemList(){
    return this.state.getItemList().pipe(tap(cate => cate))
  }


  // public newItem(banner){
  //   return this.api.newItem(banner).toPromise().then( res => {
  //     this.loadBanners();
  //     this.toster.success('Banner Successfully Created',"Success",{timeOut:3000})
  //     return res;
  //   }).catch(err => {console.error('api call error from new banner ',err); throw err })
  // }

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

  // public updateItem(banner){
  //   return this.api.updateItem(banner).toPromise().then( res => {
  //     this.loadBanners();
  //     this.toster.success('Banner Successfully Updated',"Success",{timeOut:3000})
  //     return res;
  //   }).catch(err => {console.error('api call error from Update banner ',err); throw err })
  // }

  public changeActivationStatus(row:itemList){
    return this.api.updateActivationStatus(row.is_active,row._id).toPromise().then(res => {
      this.toster.success('Unit Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Unit',err ); throw err  })
  }
}
