import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersApiService } from './api/users-api.service';
import { UsersStateService } from './state/users-state.service';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  constructor(private usersapi:UsersApiService,
    private usersstate:UsersStateService) { }

  loadUsers(){
    // this.usersapi.getUsers().pipe(tap((res) => {
    //   console.log('facade loadusers',res)
    //   this.usersstate.setUsers(res);
    // }))
    this.usersapi.getUsers().subscribe(res => {
        console.log('facade loadusers',res)
        this.usersstate.setUsers(res)
      })

  }

  getUsers(){
    return this.usersstate.getUsers().pipe(tap(res => res))
  }

}
