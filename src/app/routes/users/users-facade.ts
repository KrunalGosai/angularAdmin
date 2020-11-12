import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersApiService } from './api/users-api.service';
import { UsersStateService } from './state/users-state.service';
import { userEntity, userList } from './entities';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  constructor(private api:UsersApiService,
    private usersstate:UsersStateService,
    private toster: ToastrService) { }

  loadUsers(currentPage = 1,currentPageSize = 5,searchByName = ''){
    this.api.getUsers(currentPage,currentPageSize,searchByName).subscribe(res => {
        this.usersstate.setUsers(res)
    })
  }

  getUsers(){
    return this.usersstate.getUsers().pipe(tap(res => res))
  }

  public getRoleList(){
    return this.api.getUserRoleList().pipe(tap(res => res))
  }
  
  public getCountryList(){
    return this.api.getCountryList().pipe(tap(res => res))
  }

  public getStateList(){
    return this.api.getStateList().pipe(tap(res => res))
  }

  public getCityList(){
    return this.api.getCityList().pipe(tap(res => res))
  }

  public getAreaList(){
    return this.api.getAreaList().pipe(tap(res => res))
  }

  public getVehicleList(){
    return this.api.getVehicleList().pipe(tap(res => res))
  }

  public newUser(user:userEntity){
    return this.api.newUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new User ',err); throw err })
  }

  public deleteUser(userId){
    return this.api.deleteUser(userId).toPromise().then(res => {
      this.toster.success('User Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete User ',err); throw err })
  }

  public updateUser(user:userEntity){
    return this.api.updateUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update User ',err); throw err })
  }

  public loadUserDetails(userId){
    return this.api.getUserDetailsById(userId).toPromise().then(res => {
      this.usersstate.setEditUserDetails(res.data)
      return res
    }).catch(err => {console.error('api call error from load banner Details',err); throw err });
  }

  public getUserDetails(){
    return this.usersstate.getEditUserDetails().pipe(tap(res => res))
  }

  public changeActivationStatus(row:userList){
    let user:userEntity = {
      _id:row._id,
      role_id:row.role_id._id,
      first_name:row.first_name,
      contact:row.contact,
      email:row.email,
      gender:row.gender,
      is_active:row.is_active
    }
    return this.api.updateUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update User ',err); throw err })
  }



}
