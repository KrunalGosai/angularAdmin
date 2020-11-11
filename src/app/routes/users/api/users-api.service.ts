import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { userDetailsResponse, userEntity, userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private baseUrl:string = environment.SERVER_ORIGIN;
  constructor(private http:HttpClient) { }

  public getUsers(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<userListResponse>{
    let url = this.baseUrl+`/api/user/list?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByuserName=${searchByName}`;
    return this.http.get(url);
  }

  public deleteUser(userId:number){
    let url = this.baseUrl+`/api/user/delete/${userId}`
    return this.http.delete(url)
  }

  public getUserRoleList(){
    return this.http.get(this.baseUrl+'/api/role/list');
  }

  public getCountryList(){
    return this.http.get(this.baseUrl+'/api/country');
  }

  public getStateList(){
    return this.http.get(this.baseUrl+'/api/state');
  }

  public getCityList(){
    return this.http.get(this.baseUrl+'/api/city');
  }

  public getAreaList(){
    return this.http.get(this.baseUrl+'/api/area');
  }
  
  public getVehicleList(){
    return this.http.get(this.baseUrl+'/api/vehicle/list');
  }
  public newUser(user:userEntity){
    let body:any = user;
    if(user.location && user.location.trim() != '') {
      body.location = {
        type:'Point',
        coordinates:user.location.split(',')};
    }
    let url = this.baseUrl+`/api/user/register`;
    return this.http.post(url,user);
  }

  public updateUser(user:userEntity){
    let body:any = user;
    if(user.location && user.location.trim() != '') {
      body.location = {
        type:'Point',
        coordinates:user.location.split(',')};
    }
    let url = this.baseUrl+`/api/user/update/${user._id}`;
    return this.http.put(url,user);
  }

  public getUserDetailsById(userId):Observable<userDetailsResponse>{
    let url = this.baseUrl+`/api/user/userDetail/${userId}`
    return this.http.get<userDetailsResponse>(url);
  }

}

