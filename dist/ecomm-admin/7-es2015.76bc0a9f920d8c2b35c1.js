(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{Q0D8:function(t,e){},XdEn:function(t,e,i){"use strict";i.r(e),i.d(e,"ItemsModule",(function(){return Lt}));var a=i("PCNd"),r=i("tyNb"),c=i("Xibt"),o=(i("Q0D8"),i("2Vo4")),n=i("fXoL");let s=(()=>{class t{constructor(){this.items=new o.a({}),this.editItem=new o.a({}),this.itemTypes=new o.a([{name:"Sellable",value:"SELLABLE"},{name:"Packaging Material",value:"PACKAGING_MATERIAL"},{name:"Raw Material",value:"RAW_MATERIAL"}]),this.isItemsSet=!1,this.isItemDetailsSet=!1}getItemList(){return this.items.asObservable()}setItemList(t){this.isItemsSet=!0,this.items.next(t)}getEditItem(){return this.editItem.asObservable()}setEditItem(t){this.isItemDetailsSet=!0,this.editItem.next(t)}getItemTypes(){return this.itemTypes.asObservable()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=n.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var m=i("vkgz"),l=i("AytR"),b=i("tk/3");let u=(()=>{class t{constructor(t){this.http=t,this.baseURl=l.a.SERVER_ORIGIN}getItemList(t=1,e=5,i=""){let a=this.baseURl+`/api/item/get_admin_item_list?currentPage=${t}&currentPageSize=${e}`;return null!=i&&null!=i&&""!=i.trim()&&(a+="&item_type="+i),this.http.get(a)}deleteItem(t){return this.http.delete(this.baseURl+"/api/item/delete_Item/"+t)}getItemDetailsById(t){return this.http.get(this.baseURl+"/api/item/get_Itemdetail?item_id="+t)}updateActivationStatus(t,e){return this.http.put(this.baseURl+"/api/item/update_Active_Deactive_Item",{item_id:e,is_active:t})}newitem(t){return this.http.post(this.baseURl+"/api/item/add_Item",t)}updateItem(t){return this.http.put(this.baseURl+"/api/item/update/"+t._id,t)}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(b.b))},t.\u0275prov=n.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var d=i("5eHb");let p=(()=>{class t{constructor(t,e,i){this.api=t,this.state=e,this.toster=i}loadItemList(t=1,e=200,i=""){this.api.getItemList(t,e,i).subscribe(t=>{this.state.setItemList(t)},t=>console.error("api call error from load items ",t))}getItemList(t=1,e=200,i=""){return this.state.isItemsSet||this.loadItemList(t,e,i),this.state.getItemList().pipe(Object(m.a)(t=>t))}newItem(t){return this.api.newitem(t).toPromise().then(t=>(this.loadItemList(),this.toster.success("Item Successfully Created","Success",{timeOut:3e3}),t)).catch(t=>{throw console.error("api call error from new Item ",t),t})}deleteItem(t){return this.api.deleteItem(t).toPromise().then(t=>(this.toster.success("Item Successfully Deleted","Success",{timeOut:3e3}),t)).catch(t=>{throw console.error("api call error from Delete Item",t),t})}getItemDetails(t){return this.state.isItemDetailsSet||this.loadItemDetails(t),this.state.getEditItem().pipe(Object(m.a)(t=>t))}loadItemDetails(t){return this.api.getItemDetailsById(t).toPromise().then(t=>(this.state.setEditItem(t.item),t)).catch(t=>{throw console.error("api call error from load Item Details",t),t})}updateItem(t){return this.api.updateItem(t).toPromise().then(t=>(this.loadItemList(),this.toster.success("Item Successfully Updated","Success",{timeOut:3e3}),t)).catch(t=>{throw console.error("api call error from Update item ",t),t})}changeActivationStatus(t){return this.api.updateActivationStatus(t.is_active,t._id).toPromise().then(t=>(this.toster.success("Unit Successfully Updated","Success",{timeOut:3e3}),t)).catch(t=>{throw console.error("api call error from change activation status Unit",t),t})}getItemTypes(){return this.state.getItemTypes().pipe(Object(m.a)(t=>t))}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(u),n.Yb(s),n.Yb(d.b))},t.\u0275prov=n.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var h=i("Dh3D"),f=i("+0xr"),g=i("tgey"),T=i("bTqV"),v=i("XiUz"),U=i("Wp6s"),C=i("3Pt+"),I=i("kmnG"),P=i("d3UM"),y=i("ofXK"),F=i("qFsG"),_=i("M9IT"),N=i("FKr1"),S=i("1jcm"),w=i("zkoq"),D=i("NFeN");function R(t,e){if(1&t&&(n.Ub(0,"mat-option",28),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t.value),n.Cb(1),n.Qc(t.name)}}function x(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Position "),n.Tb())}const L=function(){return{standalone:!0}};function O(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",30),n.Ub(1,"input",31),n.cc("change",(function(){n.Dc(t);const i=e.$implicit;return n.gc().categoryPositionChanged(i)}))("ngModelChange",(function(i){return n.Dc(t),e.$implicit.position=i})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModelOptions",n.rc(2,L))("ngModel",t.position)}}function q(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Name "),n.Tb())}function E(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.name," ")}}function M(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Second Name "),n.Tb())}function k(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.secondary_name," ")}}function A(t,e){1&t&&(n.Ub(0,"th",32),n.Pc(1," Image "),n.Tb())}function $(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pb(1,"img",33),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.qc("src",t.thumbnail,n.Fc)}}function V(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Type "),n.Tb())}function z(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.type," ")}}function K(t,e){1&t&&(n.Ub(0,"th",32),n.Pc(1," Price "),n.Tb())}function j(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.price," ")}}function B(t,e){1&t&&(n.Ub(0,"th",32),n.Pc(1," Item Volume "),n.Tb())}function G(t,e){if(1&t&&(n.Ub(0,"td",30),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Qc(t.item_volume)}}function Q(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Active "),n.Tb())}function H(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",30),n.Ub(1,"mat-slide-toggle",34),n.cc("ngModelChange",(function(i){return n.Dc(t),e.$implicit.is_active=i}))("change",(function(){n.Dc(t);const i=e.$implicit;return n.gc().changeActivationStatus(i)})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModel",t.is_active)}}function X(t,e){1&t&&(n.Ub(0,"th",29),n.Pc(1," Controls "),n.Tb())}const Y=function(){return[]};function J(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",30),n.Ub(1,"mat-grid-list",35),n.Ub(2,"mat-grid-tile"),n.Ub(3,"button",36),n.cc("click",(function(){n.Dc(t);const i=e.$implicit;return n.gc().navigateToEdit(i._id)})),n.Ub(4,"mat-icon",37),n.Pc(5,"create"),n.Tb(),n.Tb(),n.Tb(),n.Ub(6,"mat-grid-tile"),n.Ub(7,"button",38),n.cc("click",(function(){n.Dc(t);const i=e.$implicit;return n.gc().deleteIcon(i._id)})),n.Ub(8,"mat-icon",39),n.Pc(9,"delete"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()}2&t&&(n.Cb(3),n.pc("routerLink",n.rc(1,Y)))}function W(t,e){1&t&&n.Pb(0,"tr",40)}function Z(t,e){1&t&&n.Pb(0,"tr",41)}const tt=function(){return[5,10,25]};let et=(()=>{class t{constructor(t,e,i){this.router=t,this.facade=e,this.confirmService=i,this.displayedColumns=["position","name","secondary_name","thumbnail","type","price","is_active","item_volume","controls"],this.itemTypeList=[],this.searchItemType="",this.pageDetails={currentPage:1,itemsPerPage:10,totalPages:3,totalRecords:200},this.totalBanner=0}ngOnInit(){this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType),this.facade.getItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType).subscribe(t=>{this.dataSource=new f.p(t.data),this.dataSource.sort=this.sort}),this.facade.getItemTypes().subscribe(t=>{this.itemTypeList=t})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}pageEvent(t){this.pageDetails.itemsPerPage=t.pageSize,this.pageDetails.currentPage=t.pageIndex+1,this.facade.loadItemList(this.pageDetails.currentPage,t.pageSize,this.searchItemType)}deleteIcon(t){this.confirmService.confirm("Are you sure want to delete this Item?","Confirm").subscribe(e=>{1==e&&this.facade.deleteItem(t).then(t=>this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType))})}navigateToEdit(t){this.facade.loadItemDetails(t).then(e=>{this.router.navigate(["items","edit",t])})}filterItem(){this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType)}resetFilter(){this.searchItemType=""}changeActivationStatus(t){let e=Object.assign({},t);this.facade.changeActivationStatus(e).then(t=>{this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType)})}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(r.f),n.Ob(p),n.Ob(c.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-items-components-item-list"]],viewQuery:function(t,e){var i;1&t&&n.Sc(h.a,!0),2&t&&n.yc(i=n.dc())&&(e.sort=i.first)},decls:59,vars:9,consts:[["mat-raised-button","","aria-label","View basic sidenav example","color","primary","routerLink","new"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100",1,"matero-col"],[1,"m-r-8"],["placeholder","Type","name","filterType",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["fxFlex","25","fxFlex.lt-sm","100",1,"matero-col"],["mat-raised-button","","color","primary",2,"margin-right","5px",3,"click"],["mat-raised-button","",3,"click"],["matInput","","placeholder","Ex. Abc",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","position"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","secondary_name"],["matColumnDef","thumbnail"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","type"],["matColumnDef","price"],["matColumnDef","item_volume"],["matColumnDef","is_active"],["matColumnDef","controls"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions","page"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["type","number",2,"max-width","100px",3,"ngModelOptions","ngModel","change","ngModelChange"],["mat-header-cell",""],["alt","Item Image","width","100px","height","50px",3,"src"],["color","primary",3,"ngModel","ngModelChange","change"],["cols","2","rowHeight","50px"],["mat-icon-button","","aria-label","Edit",3,"routerLink","click"],["color","primary"],["mat-icon-button","","aria-label","Delete",3,"click"],["color","accent"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(n.Pb(0,"page-header"),n.Ub(1,"section"),n.Ub(2,"a",0),n.Pc(3," Add New "),n.Tb(),n.Tb(),n.Pb(4,"br"),n.Ub(5,"div",1),n.Ub(6,"div",2),n.Ub(7,"mat-card"),n.Ub(8,"mat-card-title"),n.Pc(9,"Filter"),n.Tb(),n.Ub(10,"form"),n.Ub(11,"mat-form-field",3),n.Ub(12,"mat-label"),n.Pc(13,"Type"),n.Tb(),n.Ub(14,"mat-select",4),n.cc("ngModelChange",(function(t){return e.searchItemType=t})),n.Nc(15,R,2,2,"mat-option",5),n.Tb(),n.Tb(),n.Ub(16,"div",6),n.Ub(17,"button",7),n.cc("click",(function(){return e.filterItem()})),n.Pc(18,"Search"),n.Tb(),n.Ub(19,"button",8),n.cc("click",(function(){return e.resetFilter()})),n.Pc(20,"Reset"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Ub(21,"mat-form-field"),n.Ub(22,"mat-label"),n.Pc(23,"Search"),n.Tb(),n.Ub(24,"input",9,10),n.cc("keyup",(function(t){return e.applyFilter(t)})),n.Tb(),n.Tb(),n.Ub(26,"div",11),n.Ub(27,"table",12),n.Sb(28,13),n.Ub(29,"form"),n.Nc(30,x,2,0,"th",14),n.Nc(31,O,2,3,"td",15),n.Tb(),n.Rb(),n.Sb(32,16),n.Nc(33,q,2,0,"th",14),n.Nc(34,E,2,1,"td",15),n.Rb(),n.Sb(35,17),n.Nc(36,M,2,0,"th",14),n.Nc(37,k,2,1,"td",15),n.Rb(),n.Sb(38,18),n.Nc(39,A,2,0,"th",19),n.Nc(40,$,2,1,"td",15),n.Rb(),n.Sb(41,20),n.Nc(42,V,2,0,"th",14),n.Nc(43,z,2,1,"td",15),n.Rb(),n.Sb(44,21),n.Nc(45,K,2,0,"th",19),n.Nc(46,j,2,1,"td",15),n.Rb(),n.Sb(47,22),n.Nc(48,B,2,0,"th",19),n.Nc(49,G,2,1,"td",15),n.Rb(),n.Sb(50,23),n.Nc(51,Q,2,0,"th",14),n.Nc(52,H,2,1,"td",15),n.Rb(),n.Sb(53,24),n.Nc(54,X,2,0,"th",14),n.Nc(55,J,10,2,"td",15),n.Rb(),n.Nc(56,W,1,0,"tr",25),n.Nc(57,Z,1,0,"tr",26),n.Tb(),n.Ub(58,"mat-paginator",27),n.cc("page",(function(t){return e.pageEvent(t)})),n.Tb(),n.Tb()),2&t&&(n.Cb(14),n.pc("ngModel",e.searchItemType),n.Cb(1),n.pc("ngForOf",e.itemTypeList),n.Cb(12),n.pc("dataSource",e.dataSource),n.Cb(29),n.pc("matHeaderRowDef",e.displayedColumns),n.Cb(1),n.pc("matRowDefColumns",e.displayedColumns),n.Cb(1),n.pc("length",e.pageDetails.totalRecords)("pageSize",e.pageDetails.itemsPerPage)("pageSizeOptions",n.rc(8,tt)))},directives:[g.a,T.a,r.i,v.c,v.a,U.a,U.c,C.x,C.q,C.r,I.c,I.g,P.a,C.p,C.s,y.n,T.b,F.b,f.o,h.a,f.c,f.i,f.b,f.k,f.n,_.a,N.p,f.h,h.b,f.a,C.t,C.d,S.a,w.a,w.c,r.g,D.a,f.j,f.m],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{width:auto}"]}),t})();var it=i("uEtv"),at=i("FtGj"),rt=i("rGne"),ct=i("A5z7"),ot=i("sYmb");function nt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function st(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function mt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function lt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function bt(t,e){if(1&t&&(n.Ub(0,"mat-option",33),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function ut(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function dt(t,e){if(1&t&&(n.Ub(0,"mat-option",33),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function pt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function ht(t,e){if(1&t&&(n.Ub(0,"mat-option",33),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t.value),n.Cb(1),n.Qc(t.name)}}function ft(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function gt(t,e){if(1&t&&(n.Ub(0,"mat-option",33),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function Tt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function vt(t,e){if(1&t){const t=n.Vb();n.Ub(0,"mat-chip",34),n.cc("removed",(function(){n.Dc(t);const i=e.$implicit;return n.gc().removetag(i)})),n.Pc(1),n.Ub(2,"mat-icon",35),n.Pc(3,"cancel"),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t," ")}}function Ut(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function Ct(t,e){if(1&t&&(n.Ub(0,"mat-option",33),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function It(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function Pt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function yt(t,e){if(1&t){const t=n.Vb();n.Ub(0,"mat-chip",34),n.cc("removed",(function(){n.Dc(t);const i=e.$implicit;return n.gc().removepic(i)})),n.Pc(1),n.Ub(2,"mat-icon",35),n.Pc(3,"cancel"),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t," ")}}function Ft(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function _t(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function Nt(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}const St=function(){return["home","items","new"]},wt=function(){return["/items"]};let Dt=(()=>{class t{constructor(t,e,i,a,r,c){this.fb=t,this.router=e,this.activeRoute=i,this.facade=a,this.unitFacde=r,this.categoryFacade=c,this.isEditMode=!1,this.activeEditId="",this.separatorKeysCodes=[at.g,at.c],this.itemForm=this.fb.group({name:["",[C.w.required]],secondary_name:[""],price:[0],is_active:[!0],item_volume:[0],category_id:[""],unit_id:[""],item_type:[""],description:[""],benefits:[""],category_tags:[[]],thumbnail:[""],picture:[[]],recommended_items:[[]],subCategory_ids:[[]]}),this.activeRoute.params.subscribe(t=>{null!=t.id&&null!=t.id&&""!=t.id&&(this.isEditMode=!0,this.activeEditId=t.id)})}ngOnInit(){this.categoryFacade.loadParentCategories(),this.categoryFacade.loadCategories(1,500),this.unitFacde.loadUnites(1,500),this.categoryFacade.getParentCategories().subscribe(t=>{this.categoryList=t}),this.categoryFacade.getCategories(1,200,"","").subscribe(t=>{this.subCategoryList=t.data}),this.unitFacde.getUnites().subscribe(t=>{this.unitList=t.data}),this.facade.getItemTypes().subscribe(t=>{this.itemTypeList=t}),this.isEditMode&&this.facade.getItemDetails(this.activeEditId).subscribe(t=>{let e=Object.assign({},t);this.itemForm.patchValue(t),this.itemForm.patchValue({item_type:e.type})},t=>console.error(t))}get is_active_value(){return!!this.itemForm.get("is_active").value&&this.itemForm.get("is_active").value}onFormSubmit(t){if(console.log("form value ",this.itemForm.value,this.itemForm.valid),this.itemForm.valid)if(this.isEditMode){let t=this.itemForm.value;t._id=this.activeEditId,this.facade.updateItem(t).then(t=>{this.itemForm.reset(),this.router.navigate(["items"])})}else this.facade.newItem(this.itemForm.value).then(t=>{this.itemForm.reset(),this.router.navigate(["items"])})}addtag(t){const e=t.input,i=t.value;let a=[...this.itemForm.get("category_tags").value];(i||"").trim()&&(a.push(i.trim()),this.itemForm.get("category_tags").setValue(a)),e&&(e.value="")}removetag(t){let e=[...this.itemForm.get("category_tags").value];const i=e.indexOf(t);i>=0&&(e.splice(i,1),this.itemForm.get("category_tags").setValue(e))}addpic(t){const e=t.input,i=t.value;let a=[...this.itemForm.get("picture").value];(i||"").trim()&&(a.push(i.trim()),this.itemForm.get("picture").setValue(a)),e&&(e.value="")}removepic(t){let e=[...this.itemForm.get("picture").value];const i=e.indexOf(t);i>=0&&(e.splice(i,1),this.itemForm.get("picture").setValue(e))}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(C.f),n.Ob(r.f),n.Ob(r.a),n.Ob(p),n.Ob(rt.a),n.Ob(it.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-items-components-item-add"]],decls:110,vars:35,consts:[[3,"title","nav"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100","fxFlex.lt-sm","100",1,"matero-col"],[1,"form-field-full",3,"formGroup","submit"],["fxLayout","row wrap","fxLayoutGap","8px grid"],["fxFlex","25","fxFlex.lt-sm","100"],["matInput","","placeholder","Name","formControlName","name","required",""],[4,"ngIf"],["matInput","","placeholder","Secondary Name","formControlName","secondary_name","required",""],["matInput","","placeholder","Price","formControlName","price","required","","type","number"],["matInput","","placeholder","Item Volume","formControlName","item_volume","required","","type","number"],["formControlName","category_id","placeholder","Category","required",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","subCategory_ids","placeholder","Sub Category","required","","multiple",""],["formControlName","item_type","placeholder","Type","required",""],["formControlName","unit_id","placeholder","Unit","required",""],["fxFlex","33","fxFlex.lt-sm","100"],["aria-label","Tags"],["chipList",""],["selectable","true","removable","true",3,"removed",4,"ngFor","ngForOf"],["placeholder","Tags",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["formControlName","recommended_items","placeholder","Recommendation","multiple","","required",""],["fxFlex","34","fxFlex.lt-sm","100"],["formControlName","is_active","color","primary"],["fxFlex","50","fxFlex.lt-sm","100"],["matInput","","placeholder","Thumbnail","formControlName","thumbnail","required",""],["aria-label","Pictures"],["picList",""],["placeholder","Pictures",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["matInput","","placeholder","Description","formControlName","description","required",""],["matInput","","placeholder","Benefits","formControlName","benefits","required",""],["mat-raised-button","","color","primary","type","submit",1,"m-t-8",2,"margin-right","5px"],["mat-raised-button","","type","button",1,"m-t-8",3,"routerLink"],[3,"value"],["selectable","true","removable","true",3,"removed"],["matChipRemove",""]],template:function(t,e){if(1&t&&(n.Pb(0,"page-header",0),n.Ub(1,"div",1),n.Ub(2,"div",2),n.Ub(3,"mat-card"),n.Ub(4,"mat-card-title"),n.Pc(5),n.Tb(),n.Ub(6,"form",3),n.cc("submit",(function(t){return e.onFormSubmit(t)})),n.Ub(7,"div",4),n.Ub(8,"div",5),n.Ub(9,"mat-form-field"),n.Ub(10,"mat-label"),n.Pc(11,"Name"),n.Tb(),n.Pb(12,"input",6),n.Nc(13,nt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(14,"div",5),n.Ub(15,"mat-form-field"),n.Ub(16,"mat-label"),n.Pc(17,"Secondary Name"),n.Tb(),n.Pb(18,"input",8),n.Nc(19,st,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(20,"div",5),n.Ub(21,"mat-form-field"),n.Ub(22,"mat-label"),n.Pc(23,"Price"),n.Tb(),n.Pb(24,"input",9),n.Nc(25,mt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(26,"div",5),n.Ub(27,"mat-form-field"),n.Ub(28,"mat-label"),n.Pc(29,"Item Volume"),n.Tb(),n.Pb(30,"input",10),n.Nc(31,lt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(32,"div",5),n.Ub(33,"mat-form-field"),n.Ub(34,"mat-label"),n.Pc(35,"Category"),n.Tb(),n.Ub(36,"mat-select",11),n.Nc(37,bt,2,2,"mat-option",12),n.Tb(),n.Nc(38,ut,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(39,"div",5),n.Ub(40,"mat-form-field"),n.Ub(41,"mat-label"),n.Pc(42,"Sub Category"),n.Tb(),n.Ub(43,"mat-select",13),n.Nc(44,dt,2,2,"mat-option",12),n.Tb(),n.Nc(45,pt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(46,"div",5),n.Ub(47,"mat-form-field"),n.Ub(48,"mat-label"),n.Pc(49,"Type"),n.Tb(),n.Ub(50,"mat-select",14),n.Nc(51,ht,2,2,"mat-option",12),n.Tb(),n.Nc(52,ft,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(53,"div",5),n.Ub(54,"mat-form-field"),n.Ub(55,"mat-label"),n.Pc(56,"Unit"),n.Tb(),n.Ub(57,"mat-select",15),n.Nc(58,gt,2,2,"mat-option",12),n.Tb(),n.Nc(59,Tt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(60,"div",16),n.Ub(61,"mat-form-field"),n.Ub(62,"mat-label"),n.Pc(63,"Tags"),n.Tb(),n.Ub(64,"mat-chip-list",17,18),n.Nc(66,vt,4,1,"mat-chip",19),n.Ub(67,"input",20),n.cc("matChipInputTokenEnd",(function(t){return e.addtag(t)})),n.Tb(),n.Tb(),n.Nc(68,Ut,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(69,"div",16),n.Ub(70,"mat-form-field"),n.Ub(71,"mat-label"),n.Pc(72,"Recommendation"),n.Tb(),n.Ub(73,"mat-select",21),n.Nc(74,Ct,2,2,"mat-option",12),n.Tb(),n.Nc(75,It,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(76,"div",22),n.Ub(77,"mat-slide-toggle",23),n.Pc(78),n.Tb(),n.Tb(),n.Ub(79,"div",24),n.Ub(80,"mat-form-field"),n.Ub(81,"mat-label"),n.Pc(82,"Thumbnail"),n.Tb(),n.Pb(83,"input",25),n.Nc(84,Pt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(85,"div",24),n.Ub(86,"mat-form-field"),n.Ub(87,"mat-label"),n.Pc(88,"Pictures"),n.Tb(),n.Ub(89,"mat-chip-list",26,27),n.Nc(91,yt,4,1,"mat-chip",19),n.Ub(92,"input",28),n.cc("matChipInputTokenEnd",(function(t){return e.addpic(t)})),n.Tb(),n.Tb(),n.Nc(93,Ft,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(94,"div",24),n.Ub(95,"mat-form-field"),n.Ub(96,"mat-label"),n.Pc(97,"Description"),n.Tb(),n.Pb(98,"textarea",29),n.Nc(99,_t,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(100,"div",24),n.Ub(101,"mat-form-field"),n.Ub(102,"mat-label"),n.Pc(103,"Benefits"),n.Tb(),n.Pb(104,"textarea",30),n.Nc(105,Nt,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Tb(),n.Ub(106,"button",31),n.Pc(107,"Save"),n.Tb(),n.Ub(108,"button",32),n.Pc(109," Back"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()),2&t){const t=n.zc(65),i=n.zc(90);n.qc("title",e.isEditMode?"Edit Item":"New Item"),n.pc("nav",n.rc(33,St)),n.Cb(5),n.Rc("",e.isEditMode?"Edit Item":"New Item"," "),n.Cb(1),n.pc("formGroup",e.itemForm),n.Cb(7),n.pc("ngIf",e.itemForm.get("name").invalid),n.Cb(6),n.pc("ngIf",e.itemForm.get("secondary_name").invalid),n.Cb(6),n.pc("ngIf",e.itemForm.get("price").invalid),n.Cb(6),n.pc("ngIf",e.itemForm.get("item_volume").invalid),n.Cb(6),n.pc("ngForOf",e.categoryList),n.Cb(1),n.pc("ngIf",e.itemForm.get("category_id").invalid),n.Cb(6),n.pc("ngForOf",e.subCategoryList),n.Cb(1),n.pc("ngIf",e.itemForm.get("subCategory_ids").invalid),n.Cb(6),n.pc("ngForOf",e.itemTypeList),n.Cb(1),n.pc("ngIf",e.itemForm.get("item_type").invalid),n.Cb(6),n.pc("ngForOf",e.unitList),n.Cb(1),n.pc("ngIf",e.itemForm.get("unit_id").invalid),n.Cb(7),n.pc("ngForOf",e.itemForm.get("category_tags").value),n.Cb(1),n.pc("matChipInputFor",t)("matChipInputSeparatorKeyCodes",e.separatorKeysCodes)("matChipInputAddOnBlur",!0),n.Cb(1),n.pc("ngIf",e.itemForm.get("category_tags").invalid),n.Cb(6),n.pc("ngForOf",e.categoryList),n.Cb(1),n.pc("ngIf",e.itemForm.get("recommended_items").invalid),n.Cb(3),n.Rc(" ",e.is_active_value?"Active":"Inactive"," "),n.Cb(6),n.pc("ngIf",e.itemForm.get("thumbnail").invalid),n.Cb(7),n.pc("ngForOf",e.itemForm.get("picture").value),n.Cb(1),n.pc("matChipInputFor",i)("matChipInputSeparatorKeyCodes",e.separatorKeysCodes)("matChipInputAddOnBlur",!0),n.Cb(1),n.pc("ngIf",e.itemForm.get("picture").invalid),n.Cb(6),n.pc("ngIf",e.itemForm.get("description").invalid),n.Cb(6),n.pc("ngIf",e.itemForm.get("benefits").invalid),n.Cb(3),n.pc("routerLink",n.rc(34,wt))}},directives:[g.a,v.c,v.a,U.a,U.c,C.x,C.q,C.k,v.d,I.c,I.g,F.b,C.d,C.p,C.i,C.v,y.o,C.t,P.a,y.n,ct.c,ct.b,S.a,T.b,r.g,I.b,N.p,ct.a,D.a,ct.d],pipes:[ot.d],styles:[""]}),t})();const Rt=[{path:"",component:et},{path:"new",component:Dt},{path:"edit/:id",component:Dt}];let xt=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[r.j.forChild(Rt)],r.j]}),t})(),Lt=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[a.a,xt]]}),t})()}}]);