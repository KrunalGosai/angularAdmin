import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private baseUrl:string = environment.SERVER_ORIGIN;
  constructor(private http:HttpClient) { }

  public getUsers(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<userListResponse>{
    let url = this.baseUrl+`/api/user/list?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&first_name=${searchByName}`;
    return this.http.get(url);
  }

}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/** Builds and returns a new User. */
function createNewUser(id: number): any {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
