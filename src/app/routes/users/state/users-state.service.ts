import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {

  private users: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  getUsers(){
    return this.users.asObservable();
  }

  setUsers(users:any[]){
    this.users.next(users);
  }



}
