import { UnitesFacadeService } from './../../unites-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { item, unit,packagingMaterial } from '../../entities';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-unites-components-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.scss']
})
export class UnitesComponentsUnitAddComponent implements OnInit {

  baseUnites: unit[];
  itemList: item[];
  unitForm: FormGroup;
  packageForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = '';
  packaging_material_consumed_value:packagingMaterial[] = [];
  packaging_material_consumed:packagingMaterial[] = [];
  packageColumns: string[] = ['item_id','item_unit_id', 'item_quantity'];
  dataSource: MatTableDataSource<any>;


  constructor(private fb: FormBuilder,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private unitFacade:UnitesFacadeService) {

      this.unitForm = this.fb.group({
        name: ['', [Validators.required]],
        base_unit: [''],
        base_quantity: [0],
        packaging_material_consumed:[[]]
      });

      this.packageForm = this.fb.group({
        item_id: ['', [Validators.required]],
        item_quantity: [0, [Validators.required]],
        item_unit_id: ['', [Validators.required]]
      });


      this.activeRoute.params.subscribe(params => {
        if(params.id != undefined && params.id != null && params.id != ''){
          this.isEditMode = true;
          this.activeEditId = params.id;
        }
      })
    
    }

  ngOnInit() {
    this.loadBaseUnitNItem();
    if(this.isEditMode){
      this.unitFacade.getUnitDetails().subscribe(res => {
        this.unitForm.patchValue({
          name:res.name,
          base_unit : res.base_unit,
          base_quantity : res.base_quantity
        })
      },err => console.error(err))
    }
  }



  public onFormSubmit(event){
    // console.log('form value ', this.unitForm.value,this.unitForm.valid,this.unitForm)
    if(!this.unitForm.valid) return;
    if(this.isEditMode){
      let value = this.unitForm.value;
      value._id = this.activeEditId;
      this.unitFacade.updateUnit(value).then(res => {
        this.unitForm.reset();
        this.router.navigate(['unites'])
      })
    }else{
      this.unitFacade.newUnit(this.unitForm.value).then(res => {
        this.unitForm.reset();
        this.packageForm.reset()
        this.router.navigate(['unites'])
      })
    }
  }

  public onPackFormSubmit(event){
    console.log(this.packageForm.valid)
    if(this.packageForm.valid){
      let formValue:any = this.packageForm.value;

      //set value to datasource variable
      this.packaging_material_consumed.push(this.packageForm.value);
      this.dataSource = new MatTableDataSource(this.packaging_material_consumed)

      //set value to main form
      this.packaging_material_consumed_value.push({
        item_id: formValue.item_id._id,
      item_quantity: formValue.item_quantity,
      item_unit_id: formValue.item_unit_id._id})

      this.unitForm.patchValue({
        packaging_material_consumed:this.packaging_material_consumed_value
      })

      //reset form
      this.packageForm.setValue({
        item_id: '',
      item_quantity: 0,
      item_unit_id: ''})

    }
  }

  public loadBaseUnitNItem(){
    this.unitFacade.loadUnites();
    this.unitFacade.loadItemList();
    this.unitFacade.getUnites().subscribe(unitres => {
      this.baseUnites = unitres.data;
    },err => console.error('error while load base unites',err))
    this.unitFacade.getItemList().subscribe(items => {
      this.itemList = items.data;
    },err => console.error('error while load base unites',err))
  }

}
