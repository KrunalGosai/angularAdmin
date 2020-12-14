import { Component, OnInit } from '@angular/core';
import { ProcessingFacadeService } from '../../processing-facade.service';

@Component({
  selector: 'app-processing-view',
  templateUrl: './processing-view.component.html',
  styleUrls: ['./processing-view.component.scss']
})
export class ProcessingViewComponent implements OnInit {

  constructor(private facade:ProcessingFacadeService) { }
  public viewData:any
  production:any[] = [];
  productionColumn:string[] = ["consumed_unit_id","consumed_quantity"];
  packagingMaterial:any[] = [];
  packagingMaterialColumn:string[] = ["item_id","consumed_unit_id","consumed_quantity","wastage_unit_id","wastage_quantity"];

  ngOnInit(): void {
    this.facade.getProcessingUnitViewData().subscribe(data => {
      this.viewData = data;
      if(this.viewData.items[0].production_unit_ids && this.viewData.items[0].production_unit_ids.length > 0 )
        this.production = this.viewData.items[0].production_unit_ids;
      if(this.viewData.items[0].packaging_material && this.viewData.items[0].packaging_material.length > 0 )
        this.packagingMaterial = this.viewData.items[0].packaging_material;
    })
  }

}
