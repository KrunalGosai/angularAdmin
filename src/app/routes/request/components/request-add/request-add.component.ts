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
import { UserRole } from '@shared/entities';

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
	itemList:any;
	unitList: unit[];
	requestType: Array<object> = [];
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
	activeEditId:string = '';
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
		private activeRoute:ActivatedRoute,
		private itemFacade: ItemsFacadeService,
		private unitFacde: UnitesFacadeService,
		private usersFacade: UsersFacade,
		public settingService: SettingsService,
		private facade:RequestFacadeService
	) {
		this.activeRoute.params.subscribe((params) => {
			if (params.id != undefined && params.id != null && params.id != "") {
			  this.isEditMode = true;
			  this.activeEditId = params.id;
			}
		  });
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

		if(this.isEditMode){
		
			this.facade.getRequestEdit(this.activeEditId).subscribe(data => {
				console.log(data);
				if(!data._id) return;
				let sendRecieve = ''
				if(data.destination_id._id == this.settingService.user._id){
					sendRecieve = 'recieve';
				}else if(data.source_id._id == this.settingService.user._id){
					sendRecieve = 'send';
				}
				this.requestForm.patchValue({
					requestOrderType:data.type,
					selectRequestType:sendRecieve,
					sourceUserId:data.source_id._id,
					destinationUserId:data.destination_id._id,
					searchBySorceRoleName:data.source_id.role_id._id,
					destinationRoleName:data.destination_id.role_id._id,
					supplierUserId: data.supplier_id
				  })
				let cartData = [];
				data.items.map(item => {
					let obj = {
						_id:item.item_id._id,
						name : item.item_name,
						price:1,
						quantity:item.booked_item_quantity,
						unit:item.item_unit_id._id,
						unit_id:item.item_unit_id
					}
					cartData.push(obj);
				})
				this.cartItemList= cartData;
				this.reloadCartTable();
				this.sourceUserChange();
				this.filterRoleChanged('searchBySorceRoleName')
				this.filterRoleChanged('destinationRoleName')
			})
		}
		this.getRole();
		this.unitFacde.loadUnites(1, 500);
		this.unitFacde.getUnites().subscribe((units) => {
			this.unitList = units.data;
		});
		this.usersFacade.getUsersByType().subscribe(res => {
			this.filterUserList = res.userList;
			if(this.filterUserList && this.filterUserList.length){
				this.getRole();
			}			
		});

		// this.requestForm.controls['sourceUserId'].valueChanges.subscribe((value) => {
			
		// 	if(this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER'){
		// 		this.searchUserId = null;
		// 		this.getItem('RAW_MATERIAL');
		// 	}
		// 	if(this.requestForm.controls['requestOrderType'].value === 'TRANSFER_ORDER'){
		// 		// console.log(this.requestForm.controls['requestOrderType'].value,value);
		// 		this.searchUserId = value;
		// 		this.getItem('SELLABLE');
		// 	}
		// })
		
		this.requestForm.controls['requestOrderType'].valueChanges.subscribe((value) => {
			if(value === 'PURCHASE_ORDER'){
				//this.filterRoleList = this.filterRoleList.filter(role => role.type == 'PURCHASE_MANAGER' && role.type == 'MANUFACTURING_PLANT');
			}else{

			}
		})

		if(this.settingService.isAdmin)
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" },{ "value": "TRANSFER_ORDER", "lable": "Transfer Order" });
		else if(this.settingService.isPurchaseManager)
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" });
		else if(this.settingService.isManufaturingPlant || this.settingService.isDepo)
			this.requestType.push({ "value": "TRANSFER_ORDER", "lable": "Transfer Order" });


		// if(this.settingService.isAdmin || this.settingService.isManufaturingPlant || )
			
		// this.requestForm.controls['searchBySorceRoleName'].valueChanges.subscribe((value) => {
		// 	console.log("value",value)
		// 	if(this.filterRoleList && this.filterRoleList.length > 0)
		// 	this.destinationRoleList = this.filterRoleList.filter(role => role._id != value &&  role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
		// })
	}

	public sendRecieveChange(){
		let requestType = this.requestForm.get('selectRequestType').value;
		if(requestType == 'send'){
			this.requestForm.get('searchBySorceRoleName').setValue(this.settingService.user.role_id.type)
			this.requestForm.get('sourceUserId').setValue(this.settingService.user._id)
		}else if(requestType == 'recieve'){
			this.requestForm.get('destinationRoleName').setValue(this.settingService.user.role_id.type)
			this.requestForm.get('destinationUserId').setValue(this.settingService.user._id)
		}
		this.loadDestinationRoleList();
	}

	private loadDestinationRoleList(){
		let value = this.requestForm.controls['searchBySorceRoleName'].value;
		if(this.filterRoleList && this.filterRoleList.length >= 0){
			this.destinationRoleList = this.filterRoleList.filter(role => role._id != value &&  role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
			this.filterRoleChanged('destinationRoleName');
		}
	}


	get is_active_value() {
		return this.requestForm.get("is_active").value
			? this.requestForm.get("is_active").value
			: false;
	}

	get isAdmin(){
		return this.settingService.isAdmin;
	}
	public filterRoleChanged(filterType) {
		if (this.searchSorceRoleName.trim() == '') {
			this.filterUserList = [];
			return;
		}
		if (filterType === 'searchBySorceRoleName') {
			this.sourceUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
			this.loadDestinationRoleList();
		} else if (filterType === 'destinationRoleName') {
			this.destinationUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
		}
		//this.usersFacade.loadUsers(1, 200, '', this.searchSorceRoleName)
	}
	public pageEvent(event: PageEvent) {
		this.pageDetails.itemsPerPage = event.pageSize;
		this.pageDetails.currentPage = event.pageIndex + 1;
		this.itemFacade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage, null, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
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
		if(this.isEditMode){
			reqData['request_id'] = this.activeEditId;
			console.log(reqData);
			this.facade.updateRequest(reqData).then(res => {
				this.requestForm.reset();
				this.router.navigate(['request']);
			})
		}
		else{
			this.facade.raiseRequest(reqData).then((res:any) => {
				this.requestForm.reset();
				this.router.navigate(["request"]);
			}).catch((err:any) => {
				console.error("send request",err);
			});
		}
		
	}

	private reloadCartTable(){
		this.dataSourceCart = new MatTableDataSource(this.cartItemList);
		console.log(this.cartItemList);
	}

	private reloadItemTable(){
		this.pageDetails.totalRecords = this.itemList['totalCount'];
		this.dataSource = new MatTableDataSource(this.itemList['data']);
	}

	addCartItem(raw:any,index:number){
		this.itemList['data'].splice(index,1);
		raw.quantity = 1;
		this.cartItemList.push(raw);
		this.reloadCartTable();
		this.reloadItemTable();
	}
	deleteICartItem(raw:object,index:number){
		this.cartItemList.splice(index,1);
		//console.log(index,this.cartItemList);return;
		this.itemList['data'].push(raw);
		this.reloadCartTable();
		this.reloadItemTable();
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
	
	getRole(){
		this.usersFacade.getRoleList().subscribe(res => {
			let roles: any = res;
			if(this.settingService.isPurchaseManager){
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.PURCHASE_MANAGER || role.type == UserRole.MANUFACTURING_PLANT );
				this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});
				this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});
			}else if(this.settingService.isManufaturingPlant){
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.PURCHASE_MANAGER || role.type == UserRole.MANUFACTURING_PLANT || role.type == UserRole.DEPO);
				this.requestForm.controls['searchBySorceRoleName'].patchValue({"value":this.settingService.user.role_id,disabled: true});	
			}else if(this.settingService.isDepo){
				this.filterRoleList = roles.data.filter(role => role.type == (UserRole.HAWKER || UserRole.MANUFACTURING_PLANT || UserRole.RETAILERS));
			}else if(this.settingService.isHawker){
				this.filterRoleList = roles.data.filter(role => role.type == (UserRole.HAWKER || UserRole.DEPO));
			}else if(this.settingService.isRetailer){
				this.filterRoleList = roles.data.filter(role => role.type == (UserRole.RETAILERS || UserRole.DEPO));
			}else{
				this.filterRoleList = roles.data.filter(role => role.type != UserRole.ADMIN && role.type != UserRole.CUSTOMER && role.type != UserRole.DELIVERY_BOY && role.type != UserRole.SUPPLIER);
			}
			this.loadDestinationRoleList();
			if(this.settingService.isAdmin  || this.settingService.isManufaturingPlant || this.settingService.isPurchaseManager){

				let supplierObj =  roles.data.filter((item:any) => item.type === UserRole.SUPPLIER)[0];

				this.supplierList = this.filterUserList.filter((user:any) => user.role_id._id == supplierObj._id);
			}
			this.filterRoleChanged('searchBySorceRoleName');
		})
	}

	public sourceUserChange(){
		let value = this.requestForm.get('sourceUserId').value;
		if(this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER'){
			this.searchUserId = null;
		}
		if(this.requestForm.controls['requestOrderType'].value === 'TRANSFER_ORDER'){
			this.searchUserId = value;
		}
		this.getItem();
	}

	getItem(){
		
		// this.itemFacade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage,itemType, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
		
		this.itemFacade.getItemListForDropDown().subscribe((items:any) => {
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
						// this.dataSource = new MatTableDataSource(this.itemList['data']);
						// this.pageDetails.totalRecords = this.itemList['totalCount'];
						this.reloadItemTable();
					}
				}
			}else{
				//console.log("ocean",items);
				this.itemList = items;
				// this.dataSource = new MatTableDataSource(this.itemList['data']);
				// this.pageDetails.totalRecords = this.itemList['totalCount'];
				this.reloadItemTable();
			}
		})
	}

	updateUnit(row:any, index:number){
		//if(this.cartItemList[index]['unit_id']){
			this.cartItemList[index]['unit_id']['_id'] = row.unit;
		//}
	}
}
