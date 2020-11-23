import { Observable } from 'rxjs';
import { itemDetailResponse, itemListResponse, availabilityStatus } from './../entities/index';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getItemList(currentPage = 1,currentPageSize = 5,searchItemType = '',availabilityStatus?:availabilityStatus):Observable<itemListResponse>{
    let url = this.baseURl+`/api/item/get_admin_item_list?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchItemType != undefined && searchItemType !=  null && searchItemType.trim() != '')
      url += `&item_type=${searchItemType}`;
    if(availabilityStatus != undefined && availabilityStatus !=  null)
      url += `&availability_status=${availabilityStatus}`;
    return this.http.get<itemListResponse>(url);
  }

  public deleteItem(itemId){
    let url = this.baseURl+`/api/item/delete_Item/${itemId}`;
    return this.http.delete(url);
  }

  public getItemDetailsById(itemId):Observable<itemDetailResponse>{
    let url = this.baseURl+`/api/item/get_Itemdetail?item_id=${itemId}`;
    return this.http.get<itemDetailResponse>(url);
  }

  public updateActivationStatus(is_active:boolean,item_id:string){
    let url = this.baseURl+`/api/item/update_Active_Deactive_Item`;
    let body = {
      item_id,is_active
    }
    return this.http.put(url,body);
  }

  public newitem(item){
    let url = this.baseURl + '/api/item/add_Item';
    return this.http.post(url,item);
  }

  public updateItem(item){
    let url = this.baseURl + `/api/item/update/${item._id}`;
    return this.http.put(url,item);
  }

  

  
}
