import { Router } from "@angular/router";
import { ConfirmService } from "./../../../../shared/services/confirm.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { map, subscribeOn } from "rxjs/operators";
import { UsersFacade } from "../../users-facade";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { userList } from "../../entities";

export interface UserData {
  name: string;
  color: string;
  age: number;
}

@Component({
  selector: "app-users-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UsersUserListComponent implements OnInit {
  displayedColumns: string[] = [
    "first_name",
    "last_name",
    "email",
    "role_id",
    "contact",
    "dob",
    "is_active",
    "account_verified",
    "controls",
  ];
  dataSource: MatTableDataSource<userList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage: 1,
    itemsPerPage: 5,
    totalRecords: 0,
  };
  searchByName: string = "";

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.usersFacade.loadUsers(
      this.pageDetails.currentPage,
      this.pageDetails.itemsPerPage,
      this.searchByName
    );
    this.usersFacade.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.userList);
      this.pageDetails.totalRecords = res.totalCount;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteUser(row: userList) {
    this.confirmService
      .confirm("Are you sure want to delete this User?", "Confirm")
      .subscribe((result) => {
        if (result == true) {
          this.usersFacade
            .deleteUser(row._id)
            .then((res) =>
              this.usersFacade.loadUsers(
                this.pageDetails.currentPage,
                this.pageDetails.itemsPerPage,
                this.searchByName
              )
            );
        }
      });
  }

  public pageEvent(event: PageEvent) {
    console.log(event);
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex + 1;
    this.usersFacade.loadUsers(
      this.pageDetails.currentPage,
      event.pageSize,
      this.searchByName
    );
  }

  public resetFilter() {
    this.searchByName = "";
  }

  public filterUsers() {
    this.usersFacade.loadUsers(
      this.pageDetails.currentPage,
      this.pageDetails.itemsPerPage,
      this.searchByName
    );
  }

  public navigateToEdit(id) {
    this.usersFacade.loadUserDetails(id).then((user) => {
      this.router.navigate(["users", "edit", id]);
    });
  }

  public changeActivationStatus(row: userList) {
    let rowcopy = { ...row };
    this.usersFacade.changeActivationStatus(rowcopy);
  }
}
