import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { UsersFacade } from '../../users-facade';

export interface UserData {
  name: string;
  color: string;
  age: number;
}

let exampleData:any = [
  // { name: 'Austin', color: 'blue', age: 30 },
  // { name: 'Jeremy', color: 'green', age: 33 }
];


@Component({
  selector: 'app-users-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UsersUserListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;

  displayedColumns = ['name', 'color', 'age'];
  paginatedDataSource: PaginatedDataSource;

  constructor(private usersFacade: UsersFacade) { }

  ngOnInit() {
    this.usersFacade.loadUsers();
    this.paginatedDataSource = new PaginatedDataSource(this.pager);
    this.usersFacade.getUsers().subscribe(res => {
      console.log('paginator',this.paginatedDataSource.dataChange)
      exampleData = res;
      this.paginatedDataSource.dataChange.next(res);
    })
    
  }

}

export class PaginatedDataSource extends DataSource<UserData> {
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  constructor(private paginator: MatPaginator) {
    super();
    this.dataChange.next(exampleData);
  }

  connect(): Observable<UserData[]> {
    const displayDataChanges = [this.dataChange, this.paginator.page];

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = [...exampleData];
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
      })
    );
  }

  disconnect() {}
}

