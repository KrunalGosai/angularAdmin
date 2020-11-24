import { itemList } from './../../entities/index';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public viewData: itemList) { }

  ngOnInit(): void {
  }

}
