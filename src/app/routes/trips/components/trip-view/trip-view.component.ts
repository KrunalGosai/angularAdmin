import { TripFacadeService } from './../../trip-facade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss']
})
export class TripViewComponent implements OnInit {

  constructor(private facade:TripFacadeService) { }
  public viewData:any = {};
  displayedColumns: string[] = ['order_id', 'order_status','payment_mode','payment_status'];
  dataSource = [];

  ngOnInit(): void {
    this.facade.getTripViewData().subscribe(row => {
      this.viewData = row;
      this.dataSource = this.viewData.orders;
      console.log(this.viewData);
    })
  }

}
