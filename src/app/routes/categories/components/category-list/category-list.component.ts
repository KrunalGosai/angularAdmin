import { CategoriesFacadeService } from './../../categories-facade';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-components-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoriesComponentsCategoryListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'parent', 'controls'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //filter field
  q = {
    username: '',
    email: '',
    gender: '',
  };

  constructor(private categoriesFacade:CategoriesFacadeService ,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categoriesFacade.loadCategories();
    this.categoriesFacade.getCategories().subscribe(cate => {
      this.dataSource = new MatTableDataSource(cate);
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
