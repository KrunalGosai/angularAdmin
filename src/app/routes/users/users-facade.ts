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

  loadUsers(currentPage = 1,currentPageSize = 5,searchByName = ''){
    this.usersapi.getUsers(currentPage,currentPageSize,searchByName).subscribe(res => {
        this.usersstate.setUsers(res)
    })
  }

  getUsers(){
    return this.usersstate.getUsers().pipe(tap(res => res))
  }

}
