import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { UsersFacade } from '../../users-facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserData {
  name: string;
  color: string;
  age: number;
}

@Component({
  selector: 'app-users-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UsersUserListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'color','controls'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //filter field
  q = {
    username: '',
    email: '',
    gender: '',
  };


  constructor(private usersFacade: UsersFacade, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usersFacade.loadUsers();
    this.usersFacade.getUsers().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteIcon() {
    this.snackBar.open('Item deleted', '', { duration: 2000 });
  }

}
