import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor() { }

  getUsers(){
    return of([
      { name: 'Austin', color: 'blue', age: 30 },
      { name: 'Jeremy', color: 'green', age: 33 },
      { name: 'Kara', color: 'purple', age: 29 },
      { name: 'Tina', color: 'yellow', age: 35 },
      { name: 'Brad', color: 'pink', age: 40 },
      { name: 'Jules', color: 'red', age: 21 },
    ])
  }

}
