import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {

  private users: BehaviorSubject<userListResponse> = new BehaviorSubject({});

  constructor() { }

  getUsers():Observable<userListResponse>{
    return this.users.asObservable();
  }

  setUsers(users:userListResponse){
    this.users.next(users);
  }



}
