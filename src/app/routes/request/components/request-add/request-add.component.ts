import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ItemsFacadeService } from "../../../items/items-facade.service";
import { UnitesFacadeService } from "app/routes/unites/unites-facade";
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from "@angular/router";

import { unit } from "app/routes/unites/entities";
import { itemList } from "../../../items/entities";
import { UsersFacade } from './../../../users/users-facade';
import { RequestFacadeService } from '../../request-facade.service'
import { SettingsService } from '@core';

@Component({
	selector: 'app-request-components-request-add',
	templateUrl: './request-add.component.html',
	styleUrls: ['./request-add.component.scss']
})
export class AddRequestComponents implements OnInit {
	requestForm: FormGroup;
	recommendedList: itemList[] = [];
	displayedColumns: string[] = ['action', 'itemName', 'price'];
	cartDisplayedColumns: string[] = ['action', 'itemName', 'quantity', 'price', 'unit'];
	dataSource: MatTableDataSource<itemList>;
	itemTypeList: string[] = [];
	itemTypes: any = { SELLABLE: 'Sellable', PACKAGING_MATERIAL: 'Packaging Material', RAW_MATERIAL: 'Raw Material' };
	itemList:object;
	unitList: unit[];
	requestType: Array<object> = [{ "value": "TRANSFER_ORDER", "lable": "Transfer Order" }];
	filterRoleList: any;
	filterUserList: any = [];
	destinationRoleList: any;
	sourceUserList: Array<object>;
	destinationUserList: Array<object>;
	searchSorceRoleName: string = this.settingService.user.role_id.type;
	isEditMode: any;
	searchRoleName: string;
	searchUserId: any;
	searchByName: string;
	pageDetails = {
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 3,
		totalRecords: 200
	}
	cartItemList:Array<object> = [];
	dataSourceCart: MatTableDataSource<itemList>;
	supplierList:Array<object> = [];
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private facade: ItemsFacadeService,
		private unitFacde: UnitesFacadeService,
		private usersFacade: UsersFacade,
		public settingService: SettingsService,
		private requestServive:RequestFacadeService
	) {
		this.requestForm = this.fb.group({
			requestOrderType: ["", [Validators.required, Validators.maxLength(50)]],
			searchBySorceRoleName: ["", [Validators.required]],
			selectRequestType:["", [Validators.required]],
			// item_volume:[0],
			sourceUserId: ["", [Validators.required]],
			destinationRoleName: ["", [Validators.required]],
			destinationUserId: ["", [Validators.required]],
			supplierUserId: ["",[]]
		});
	}


	ngOnInit() {
		this.unitFacde.loadUnites(1, 500);
		this.unitFacde.getUnites().subscribe((units) => {
			this.unitList = units.data;
		});

		this.requestForm.controls['sourceUserId'].valueChanges.subscribe((value) => {
			
			if(this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER'){
				this.searchUserId = null;
				this.getItem('RAW_MATERIAL');
			}
			if(this.requestForm.controls['requestOrderType'].value === 'TRANSFER_ORDER'){
				console.log(this.requestForm.controls['requestOrderType'].value,value);
				this.searchUserId = value;
				this.getItem('SELLABLE');
			}
		})
		this.requestForm.controls['requestOrderType'].valueChanges.subscribe((value) => {
			if(value === 'PURCHASE_ORDER'){
				//this.filterRoleList = this.filterRoleList.filter(role => role.type == 'PURCHASE_MANAGER' && role.type == 'MANUFACTURING_PLANT');
			}else{

			}
		})
		this.requestForm.controls['searchBySorceRoleName'].valueChanges.subscribe((value) => {
			console.log("value",value)
			this.destinationRoleList = this.filterRoleList.filter(role => role._id != value &&  role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
		})
		this.usersFacade.loadUsers(1, 2000, '', '');
		this.usersFacade.getUsersByType(1, 2000).subscribe(res => {
			this.filterUserList = res.userList;
			if(this.filterUserList && this.filterUserList.length){
				this.getRole();
			}
			
		});
	}
	get is_active_value() {
		return this.requestForm.get("is_active").value
			? this.requestForm.get("is_active").value
			: false;
	}
	public filterRoleChanged(filterType) {
		if (this.searchSorceRoleName.trim() == '') {
			this.filterUserList = [];
			return;
		}
		if (filterType === 'searchBySorceRoleName') {
			this.sourceUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
		} else if (filterType === 'destinationRoleName') {
			this.destinationUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
		}
		//this.usersFacade.loadUsers(1, 200, '', this.searchSorceRoleName)
	}
	public pageEvent(event: PageEvent) {
		this.pageDetails.itemsPerPage = event.pageSize;
		this.pageDetails.currentPage = event.pageIndex + 1;
		this.facade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage, null, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
	}
	onFormSubmit(event) {
		const reqData = {
				"source_id" : this.requestForm.controls['sourceUserId'].value,
				"destination_id" : this.requestForm.controls['destinationUserId'].value,
				"items": [],
				"type": this.requestForm.controls['requestOrderType'].value,
				"total_items": this.cartItemList.length,
			}

		if(this.settingService.user.role_id.type === ('ADMIN' || 'PURCHASE_MANAGER')  && this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER'){
			reqData['supplier_id'] = this.requestForm.controls['supplierUserId'].value
		}
		if(this.cartItemList.length){
			this.cartItemList.map((item:any) => {
				reqData.items.push({
					"item_id":item._id,
					"item_name": item.name,
					"booked_item_quantity" : item.quantity,
					"item_unit_id": item.unit_id._id,
				});
			});
		}
		this.requestServive.raiseRequest(reqData).then((res:any) => {
			this.requestForm.reset();
        	this.router.navigate(["request"]);
		}).catch((err:any) => {
			console.error("send request",err);
		});
		
	}

	addCartItem(raw:any,index:number){
		this.itemList['data'].splice(index,1);
		this.dataSource = new MatTableDataSource(this.itemList['data']);
		this.pageDetails.totalRecords = this.itemList['totalCount'];
		raw.quantity = 1;
		this.cartItemList.push(raw);
		this.dataSourceCart = new MatTableDataSource(this.cartItemList);
	}
	deleteICartItem(raw:object,index:number){
		this.cartItemList.splice(index,1);
		this.dataSourceCart = new MatTableDataSource(this.cartItemList);
		//console.log(index,this.cartItemList);return;
		this.itemList['data'].push(raw);
		this.dataSource = new MatTableDataSource(this.itemList['data']);
		this.pageDetails.totalRecords = this.itemList['totalCount'];
		
	}
	addQuantity(index:number){
		this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) + 1;
	}
	removeQuantity(index:number){
		if(this.cartItemList[index]['quantity'] > 0){
			this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) - 1;
		}
	}
	changeQuantity(raw:object,index:number){
		this.cartItemList[index]['quantity'] = Number(raw['quantity']);
	}
	getTotal(){
		let total = 0;
		this.cartItemList.map((item:any) => {
			total = Number(total) + (Number(item.price) * item.quantity);
		});
		return total;
	}
	getRoleList(){
		let roleType = this.settingService.user.role_id.type;
		if(roleType === 'ADMIN' ){

		}
	}
	getRole(){
		this.usersFacade.getRoleList().subscribe(res => {
			let roles: any = res;
			if(this.settingService.user.role_id.type === ('PURCHASE_MANAGER' || 'MANUFACTURING_PLANT')){
				this.filterRoleList = roles.data.filter(role => role.type == 'PURCHASE_MANAGER' && role.type == 'MANUFACTURING_PLANT');
				if(this.settingService.user.role_id.type === 'PURCHASE_MANAGER'){
					this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});
					
					this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});

					// this.requestForm.controls['sourceUserId'].patchValue({"value":this.settingService.user._id,disabled: true});
					

				}
				if(this.settingService.user.role_id.type === 'MANUFACTURING_PLANT'){
					this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});	
				}
			}else if(this.settingService.user.role_id.type === 'DEPO'){
				this.filterRoleList = roles.data.filter(role => role.type == 'HAWKER' && role.type == 'MANUFACTURING_PLANT' || role.type == 'RETAILERS');
			}else if(this.settingService.user.role_id.type === 'HAWKER'){
				this.filterRoleList = roles.data.filter(role => role.type == 'HAWKER' && role.type == 'DEPO');
			}else if(this.settingService.user.role_id.type === 'RETAILERS'){
				this.filterRoleList = roles.data.filter(role => role.type == 'RETAILERS' && role.type == 'DEPO');
			}else{
				this.filterRoleList = roles.data.filter(role => role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
			}
			if(this.settingService.user.role_id.type === 'ADMIN' || this.settingService.user.role_id.type === 'MANUFACTURING_PLANT' || this.settingService.user.role_id.type == 'PURCHASE_MANAGER'){
				
				this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" });

				let supplierObj =  roles.data.filter((item:any) => item.type === 'SUPPLIER')[0];

				this.supplierList = this.filterUserList.filter((user:any) => user.role_id._id == supplierObj._id);
			}
		})
	}
	getItem(itemType:string){
		
		this.facade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage,itemType, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
		
		this.facade.getItemListForDropDown().subscribe((items:any) => {
			if(this.requestForm.controls['requestOrderType'].value == 'TRANSFER_ORDER'){
				let filterItem = {"data" : [],"totalCount":0};
				if(items){
					if(items.data){
						items.data.map((item:any) => {
							if(item.hasOwnProperty('all_item_units')){
								item.all_item_units.map((unit:any) => {
									if(!unit.is_customer_show){
										item.unit_id = unit; 
										filterItem.data.push(item);	
									}
								});	
							}else{
								filterItem.data.push(item);	
							}
						});
						filterItem.totalCount = items.totalCount;
						this.itemList = filterItem;
						this.dataSource = new MatTableDataSource(this.itemList['data']);
						this.pageDetails.totalRecords = this.itemList['totalCount'];
					}
				}
			}else{
				//console.log("ocean",items);
				this.itemList = items;
				this.dataSource = new MatTableDataSource(this.itemList['data']);
				this.pageDetails.totalRecords = this.itemList['totalCount'];
			}
		})
	}

	updateUnit(row:any, index:number){
		//if(this.cartItemList[index]['unit_id']){
			this.cartItemList[index]['unit_id']['_id'] = row.unit;
		//}
	}
}
