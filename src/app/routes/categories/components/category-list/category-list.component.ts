import { ConfirmService } from './../../../../shared/services/confirm.service';
import { CategoriesFacadeService } from './../../categories-facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categories-components-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoriesComponentsCategoryListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'parent', 'active', 'controls'];
  dataSource: MatTableDataSource<any>;
  parentCategoryFilterValue:string = '';
  parentCategoryList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:5,
    totalPages:3,
    totalRecords:100
  }
  totalCategory:number = 0;

  //filter field
  q = {
    username: '',
    email: '',
    gender: '',
  };

  constructor(private categoriesFacade:CategoriesFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.categoriesFacade.loadCategories();
    this.categoriesFacade.loadParentCategories();
    this.categoriesFacade.getCategories().subscribe(cate => {
      this.dataSource = new MatTableDataSource(cate.data);
      this.totalCategory = cate.categryCount
    })
    this.categoriesFacade.getParentCategories().subscribe(parent => {
      this.parentCategoryList = parent;
    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public pageEvent(event:PageEvent){
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex+1;
    this.categoriesFacade.loadCategories(this.pageDetails.currentPage,event.pageSize,'');
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this category?','Confirm').subscribe(result => {
      if(result == true){
        this.categoriesFacade.deleteCategory(id)
          .then(res => this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage))
      }
    })
  }

  public navigateToEdit(id){
  }

  public filterCategories(){
    this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue)
  }

}
