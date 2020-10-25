import { banner } from './Entities/index';
import { BannerStateService } from './state/banner-state.service';
import { BannerApiService } from './api/banner-api.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannersFacadeService {

  constructor(private api:BannerApiService, private state:BannerStateService, private toster: ToastrService) { }

  public loadBanners(currentPage = 1,currentPageSize = 5, searchByName= ''){
    this.api.getAllBanner(currentPage,currentPageSize,searchByName).subscribe(banner => {
      this.state.setBanner(banner);
    },err => console.error('api call error from load categories ',err))
  }

  // public loadParentCategories(){
  //   this.api.getParentCategories().subscribe(parent => {
  //     let data:any = parent
  //     this.state.setParentCategories(data.data.categories);
  //   },err => console.error('api call error from load parent categories ',err))
  // }

  public getBanners(){
    return this.state.getBanner().pipe(tap(cate => cate))
  }

  // public getParentCategories(){
  //   return this.state.getParentCategories().pipe(tap(cate => cate))
  // }

  public newBanner(banner:banner){
    return this.api.newBanner(banner).toPromise().then( res => {
      this.loadBanners();
      this.toster.success('Banner Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new banner ',err); return err })
  }

  public deleteBanner(bannerId){
    return this.api.deleteBanner(bannerId).toPromise().then(res => {
      this.toster.success('Banner Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete baner ',err); return err })
  }

  public getBannerDetails(bannerId){
    return this.api.getBannerDetailsById(bannerId).toPromise();
  }

  public updateBanner(banner:banner){
    return this.api.updateBanner(banner).toPromise().then( res => {
      this.loadBanners();
      this.toster.success('Banner Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update banner ',err); return err })
  }
}
