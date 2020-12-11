import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getProcessingUnitsList(currentPage = 0,currentPageSize = 0):Observable<any>{
    let url = this.baseURl+`/api/item/processing_detail_form_list?`;
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    
    url = url.replace('?&','?')
      
    return this.http.get<any>(url);
  }

  public deleteProcesingUnits(itemId){
    let url = this.baseURl+`/api/item/delete_Item/${itemId}`;
    return this.http.delete(url);
  }

  // add body
//   {
//     "items": [
//         {
//             "raw_item_id": "5fc8ed4b86184a48fa58ee81",
//             "sellable_item_id":"5fc7535b2034130b6d3f9c61",
//             "production_unit_ids":
//                 [
//                     {
//                         "production_quantity":  10,
//                         "unit_id":"5fbf66535724111c6f29e913"  
//                     }
//                 ],
//             "consumed_quantity": 5,
//             "consumed_unit_id": "5fbf66535724111c6f29e913",
//             "wastage_quantity": 5,
//             "wastage_unit_id": "5fbf66535724111c6f29e913",
//             "packaging_material": [{
//                 "item_id": "5fc8eca486184a48fa58ee80",
//                 "consumed_quantity": 10,
//                 "consumed_unit_id": "5fbf66535724111c6f29e913",
//                 "wastage_quantity": 12,
//                 "wastage_unit_id": "5fbf66535724111c6f29e913"
//             }]
//         }]  
   
// }
}
