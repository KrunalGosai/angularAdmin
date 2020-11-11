import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userDetails, userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {

  private users: BehaviorSubject<userListResponse> = new BehaviorSubject({});
  private editUserDetails: BehaviorSubject<userDetails> = new BehaviorSubject({});

  constructor() { }

  getUsers():Observable<userListResponse>{
    return this.users.asObservable();
  }

  setUsers(users:userListResponse){
    this.users.next(users);
  }

  getEditUserDetails():Observable<userDetails>{
    return this.editUserDetails.asObservable();
  }

  setEditUserDetails(user:userDetails){
    this.editUserDetails.next(user);
  }



}
