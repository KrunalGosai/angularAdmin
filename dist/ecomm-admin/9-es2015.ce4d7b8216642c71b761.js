(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{jR2d:function(t,e,a){"use strict";a.r(e),a.d(e,"CategoriesModule",(function(){return at}));var i=a("PCNd"),r=a("tyNb"),o=a("uEtv"),c=a("3Pt+"),n=a("fXoL"),s=a("tgey"),l=a("XiUz"),g=a("Wp6s"),b=a("kmnG"),m=a("qFsG"),d=a("ofXK"),u=a("d3UM"),p=a("1jcm"),h=a("bTqV"),f=a("FKr1"),y=a("sYmb");function C(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function v(t,e){if(1&t&&(n.Ub(0,"mat-option",17),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function F(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function P(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function U(t,e){1&t&&(n.Ub(0,"span"),n.Pc(1,"Image Preview"),n.Tb())}function T(t,e){if(1&t&&(n.Ub(0,"a",18),n.Pb(1,"img",19),n.Tb()),2&t){const t=n.gc();n.qc("href",t.categoryForm.get("category_image").value,n.Fc),n.Cb(1),n.qc("src",t.categoryForm.get("category_image").value,n.Fc)}}const _=function(){return["home","categories","new"]},N=function(){return["/categories"]};let w=(()=>{class t{constructor(t,e,a,i){this.fb=t,this.router=e,this.activeRoute=a,this.categoryFacade=i,this.isEditMode=!1,this.activeEditId="",this.categoryForm=this.fb.group({name:["",[c.w.required]],parent_categoriesId:[""],position:[1],is_active:!0,category_image:[""]})}ngOnInit(){this.categoryFacade.loadParentCategories(),this.categoryFacade.getParentCategories().subscribe(t=>{this.categoryList=t}),this.activeRoute.params.subscribe(t=>{null!=t.id&&null!=t.id&&""!=t.id&&(this.isEditMode=!0,this.activeEditId=t.id),this.isEditMode&&this.categoryFacade.getCategoryDetails(this.activeEditId).subscribe(t=>{this.categoryForm.patchValue({name:t.name,parent_categoriesId:t.parent_categoriesIds&&t.parent_categoriesIds.length>0?t.parent_categoriesIds[0]:"",position:t.position,category_image:t.category_image?t.category_image:"",is_active:t.is_active})},t=>console.error(t))})}get is_active_value(){return!!this.categoryForm.get("is_active").value&&this.categoryForm.get("is_active").value}fileUpladChange(t){let e=t.target.files;if(e&&null!=e&&e.length>0){let t=e[0];this.categoryForm.get("category_img_name").setValue(t.name),this.categoryForm.get("img_file").setValue(t)}else this.categoryForm.get("category_img_name").reset()}onFormSubmit(t){if(this.categoryForm.valid)if(this.isEditMode){let t=this.categoryForm.value;t._id=this.activeEditId,this.categoryFacade.updateCategory(t).then(t=>{this.categoryForm.reset(),this.router.navigate(["categories"])})}else this.categoryFacade.newCategory(this.categoryForm.value).then(t=>{this.categoryForm.reset(),this.router.navigate(["categories"])}).catch(t=>{})}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(c.f),n.Ob(r.f),n.Ob(r.a),n.Ob(o.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-categories-components-category-add"]],decls:42,vars:14,consts:[[3,"title","nav"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100","fxFlex.lt-sm","100",1,"matero-col"],[1,"form-field-full",3,"formGroup","submit"],["fxLayout","row wrap","fxLayoutGap","8px grid"],["fxFlex","50","fxFlex.lt-sm","100"],["matInput","","placeholder","Category Name","formControlName","name","required",""],[4,"ngIf"],["formControlName","parent_categoriesId","placeholder","Parent Category"],[3,"value",4,"ngFor","ngForOf"],["fxFlex","25","fxFlex.lt-sm","100"],["matInput","","placeholder","Position Order","formControlName","position","required","","type","number"],["matInput","","placeholder","Image URL","type","text","formControlName","category_image","required",""],["target","_blank",3,"href",4,"ngIf"],["formControlName","is_active","color","primary"],["mat-raised-button","","color","primary","type","submit",1,"m-t-8",2,"margin-right","5px"],["mat-raised-button","","type","button",1,"m-t-8",3,"routerLink"],[3,"value"],["target","_blank",3,"href"],["alt","Image Preview","width","100%","height","50px",3,"src"]],template:function(t,e){1&t&&(n.Pb(0,"page-header",0),n.Ub(1,"div",1),n.Ub(2,"div",2),n.Ub(3,"mat-card"),n.Ub(4,"mat-card-title"),n.Pc(5),n.Tb(),n.Ub(6,"form",3),n.cc("submit",(function(t){return e.onFormSubmit(t)})),n.Ub(7,"div",4),n.Ub(8,"div",5),n.Ub(9,"mat-form-field"),n.Ub(10,"mat-label"),n.Pc(11,"Name"),n.Tb(),n.Pb(12,"input",6),n.Nc(13,C,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(14,"div",5),n.Ub(15,"mat-form-field"),n.Ub(16,"mat-label"),n.Pc(17,"Parent Category"),n.Tb(),n.Ub(18,"mat-select",8),n.Nc(19,v,2,2,"mat-option",9),n.Tb(),n.Tb(),n.Tb(),n.Ub(20,"div",10),n.Ub(21,"mat-form-field"),n.Ub(22,"mat-label"),n.Pc(23,"Position"),n.Tb(),n.Pb(24,"input",11),n.Nc(25,F,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(26,"div",10),n.Ub(27,"mat-form-field"),n.Ub(28,"mat-label"),n.Pc(29,"Image URL"),n.Tb(),n.Pb(30,"input",12),n.Nc(31,P,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(32,"div",10),n.Nc(33,U,2,0,"span",7),n.Nc(34,T,2,2,"a",13),n.Tb(),n.Ub(35,"div",10),n.Ub(36,"mat-slide-toggle",14),n.Pc(37),n.Tb(),n.Tb(),n.Tb(),n.Ub(38,"button",15),n.Pc(39,"Save"),n.Tb(),n.Ub(40,"button",16),n.Pc(41,"Back"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()),2&t&&(n.qc("title",e.isEditMode?"Edit Category":"New Category"),n.pc("nav",n.rc(12,_)),n.Cb(5),n.Rc("",e.isEditMode?"Edit Category":"New Category"," "),n.Cb(1),n.pc("formGroup",e.categoryForm),n.Cb(7),n.pc("ngIf",e.categoryForm.get("name").invalid),n.Cb(6),n.pc("ngForOf",e.categoryList),n.Cb(6),n.pc("ngIf",e.categoryForm.get("position").invalid),n.Cb(6),n.pc("ngIf",e.categoryForm.get("category_image").invalid),n.Cb(2),n.pc("ngIf",""==e.categoryForm.get("category_image").value.trim()),n.Cb(1),n.pc("ngIf",""!=e.categoryForm.get("category_image").value.trim()),n.Cb(3),n.Rc(" ",e.is_active_value?"Active":"Inactive"," "),n.Cb(3),n.pc("routerLink",n.rc(13,N)))},directives:[s.a,l.c,l.a,g.a,g.c,c.x,c.q,c.k,l.d,b.c,b.g,m.b,c.d,c.p,c.i,c.v,d.o,u.a,d.n,c.t,p.a,h.b,r.g,b.b,f.p],pipes:[y.d],styles:[""]}),t})();var I=a("Xibt"),D=a("Dh3D"),x=a("+0xr"),M=a("zkoq"),R=a("NFeN");function S(t,e){if(1&t&&(n.Ub(0,"mat-option",27),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function V(t,e){1&t&&(n.Ub(0,"th",28),n.Pc(1," Position "),n.Tb())}const k=function(){return{standalone:!0}};function O(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",29),n.Ub(1,"input",30),n.cc("change",(function(){n.Dc(t);const a=e.$implicit;return n.gc().categoryPositionChanged(a)}))("ngModelChange",(function(a){return n.Dc(t),e.$implicit.position=a})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModelOptions",n.rc(2,k))("ngModel",t.position)}}function L(t,e){1&t&&(n.Ub(0,"th",31),n.Pc(1," Category Image "),n.Tb())}function E(t,e){if(1&t&&(n.Ub(0,"td",29),n.Pb(1,"img",32),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.qc("src",t.category_image,n.Fc)}}function q(t,e){1&t&&(n.Ub(0,"th",28),n.Pc(1," Name "),n.Tb())}function $(t,e){if(1&t&&(n.Ub(0,"td",29),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.name," ")}}function A(t,e){1&t&&(n.Ub(0,"th",31),n.Pc(1," Parent "),n.Tb())}function j(t,e){if(1&t&&(n.Ub(0,"span"),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.name," ")}}function z(t,e){if(1&t&&(n.Ub(0,"td",29),n.Nc(1,j,2,1,"span",33),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.pc("ngForOf",t.parent_categoriesIds)}}function G(t,e){1&t&&(n.Ub(0,"th",28),n.Pc(1," Created On "),n.Tb())}function H(t,e){if(1&t&&(n.Ub(0,"td",29),n.Pc(1),n.hc(2,"date"),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",n.ic(2,1,t.created_at)," ")}}function X(t,e){1&t&&(n.Ub(0,"th",28),n.Pc(1," Active "),n.Tb())}function Q(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",29),n.Ub(1,"mat-slide-toggle",34),n.cc("ngModelChange",(function(a){return n.Dc(t),e.$implicit.is_active=a}))("change",(function(){n.Dc(t);const a=e.$implicit;return n.gc().changeActivationStatus(a)})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModel",t.is_active)}}function J(t,e){1&t&&(n.Ub(0,"th",31),n.Pc(1," Controls "),n.Tb())}const K=function(){return[]};function B(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",29),n.Ub(1,"mat-grid-list",35),n.Ub(2,"mat-grid-tile"),n.Ub(3,"button",36),n.cc("click",(function(){n.Dc(t);const a=e.$implicit;return n.gc().navigateToEdit(a._id)})),n.Ub(4,"mat-icon",37),n.Pc(5,"create"),n.Tb(),n.Tb(),n.Tb(),n.Ub(6,"mat-grid-tile"),n.Ub(7,"button",38),n.cc("click",(function(){n.Dc(t);const a=e.$implicit;return n.gc().deleteIcon(a._id)})),n.Ub(8,"mat-icon",39),n.Pc(9,"delete"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()}2&t&&(n.Cb(3),n.pc("routerLink",n.rc(1,K)))}function W(t,e){1&t&&n.Pb(0,"tr",40)}function Y(t,e){1&t&&n.Pb(0,"tr",41)}function Z(t,e){1&t&&(n.Ub(0,"tr",42),n.Ub(1,"td",43),n.Pc(2,"No data"),n.Tb(),n.Tb())}const tt=[{path:"",component:(()=>{class t{constructor(t,e,a){this.router=t,this.categoriesFacade=e,this.confirmService=a,this.displayedColumns=["position","category_image","name","parent","created_at","is_active","controls"],this.parentCategoryFilterValue="",this.categoryNameFilterValue="",this.pageDetails={currentPage:1,itemsPerPage:200,totalRecords:200},this.q={username:"",email:"",gender:""}}ngOnInit(){this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue),this.categoriesFacade.loadParentCategories(),this.categoriesFacade.getCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue).subscribe(t=>{this.dataSource=new x.p(t.data),this.dataSource.sort=this.sort,this.pageDetails.totalRecords=t.TotalCount}),this.categoriesFacade.getParentCategories().subscribe(t=>{this.parentCategoryList=t})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase()}pageEvent(t){this.pageDetails.itemsPerPage=t.pageSize,this.pageDetails.currentPage=t.pageIndex+1,this.categoriesFacade.loadCategories(this.pageDetails.currentPage,t.pageSize,this.parentCategoryFilterValue,this.categoryNameFilterValue)}deleteIcon(t){this.confirmService.confirm("Are you sure want to delete this category?","Confirm").subscribe(e=>{1==e&&this.categoriesFacade.deleteCategory(t).then(t=>this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue))})}changeActivationStatus(t){this.categoriesFacade.changeActivationStatus(t._id,t.is_active)}navigateToEdit(t){this.categoriesFacade.loadCategoryDetails(t).then(e=>{this.router.navigate(["categories","edit",t])})}filterCategories(){this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue)}resetFilter(){this.categoryNameFilterValue="",this.parentCategoryFilterValue=""}categoryPositionChanged(t){let e={_id:t._id,name:t.name,is_active:t.is_active,position:t.position,category_image:t.category_image};null!=t.parent_categoriesIds&&null!=t.parent_categoriesIds&&t.parent_categoriesIds.length>0&&(e.parent_categoriesId=t.parent_categoriesIds[0]._id),this.categoriesFacade.updateCategory(e)}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(r.f),n.Ob(o.a),n.Ob(I.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-categories-components-category-list"]],viewQuery:function(t,e){var a;1&t&&n.Sc(D.a,!0),2&t&&n.yc(a=n.dc())&&(e.sort=a.first)},decls:59,vars:6,consts:[["mat-raised-button","","aria-label","View basic sidenav example","color","primary","routerLink","new"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100",1,"matero-col"],["fxFlex","25","fxFlex.lt-sm","100",1,"matero-col"],["name","parentCategory",3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","placeholder","Category Name","name","name",3,"ngModel","ngModelChange"],["mat-raised-button","","color","primary",2,"margin-right","5px",3,"click"],["mat-raised-button","",3,"click"],["matInput","","placeholder","Ex. Abc",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","position"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","category_image"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","name"],["matColumnDef","parent"],["matColumnDef","created_at"],["matColumnDef","is_active"],["matColumnDef","controls"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["type","number",2,"max-width","100px",3,"ngModelOptions","ngModel","change","ngModelChange"],["mat-header-cell",""],["alt","Category Image","width","100px","height","50px",3,"src"],[4,"ngFor","ngForOf"],["color","primary",3,"ngModel","ngModelChange","change"],["cols","2","rowHeight","50px"],["mat-icon-button","","aria-label","Edit",3,"routerLink","click"],["color","primary"],["mat-icon-button","","aria-label","Delete",3,"click"],["color","accent"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","4",1,"mat-cell"]],template:function(t,e){1&t&&(n.Pb(0,"page-header"),n.Ub(1,"section"),n.Ub(2,"a",0),n.Pc(3," Add New "),n.Tb(),n.Tb(),n.Pb(4,"br"),n.Ub(5,"div",1),n.Ub(6,"div",2),n.Ub(7,"mat-card"),n.Ub(8,"mat-card-title"),n.Pc(9,"Filter"),n.Tb(),n.Ub(10,"form"),n.Ub(11,"mat-form-field",3),n.Ub(12,"mat-label"),n.Pc(13,"Parent Category"),n.Tb(),n.Ub(14,"mat-select",4),n.cc("ngModelChange",(function(t){return e.parentCategoryFilterValue=t})),n.Ub(15,"mat-option",5),n.Pc(16,"--Select--"),n.Tb(),n.Nc(17,S,2,2,"mat-option",6),n.Tb(),n.Tb(),n.Ub(18,"mat-form-field",3),n.Ub(19,"mat-label"),n.Pc(20,"Category Name"),n.Tb(),n.Ub(21,"input",7),n.cc("ngModelChange",(function(t){return e.categoryNameFilterValue=t})),n.Tb(),n.Tb(),n.Ub(22,"div",3),n.Ub(23,"button",8),n.cc("click",(function(){return e.filterCategories()})),n.Pc(24,"Search"),n.Tb(),n.Ub(25,"button",9),n.cc("click",(function(){return e.resetFilter()})),n.Pc(26,"Reset"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Ub(27,"mat-form-field"),n.Ub(28,"mat-label"),n.Pc(29,"Search"),n.Tb(),n.Ub(30,"input",10,11),n.cc("keyup",(function(t){return e.applyFilter(t)})),n.Tb(),n.Tb(),n.Ub(32,"div",12),n.Ub(33,"table",13),n.Sb(34,14),n.Ub(35,"form"),n.Nc(36,V,2,0,"th",15),n.Nc(37,O,2,3,"td",16),n.Tb(),n.Rb(),n.Sb(38,17),n.Nc(39,L,2,0,"th",18),n.Nc(40,E,2,1,"td",16),n.Rb(),n.Sb(41,19),n.Nc(42,q,2,0,"th",15),n.Nc(43,$,2,1,"td",16),n.Rb(),n.Sb(44,20),n.Nc(45,A,2,0,"th",18),n.Nc(46,z,2,1,"td",16),n.Rb(),n.Sb(47,21),n.Nc(48,G,2,0,"th",15),n.Nc(49,H,3,3,"td",16),n.Rb(),n.Sb(50,22),n.Nc(51,X,2,0,"th",15),n.Nc(52,Q,2,1,"td",16),n.Rb(),n.Sb(53,23),n.Nc(54,J,2,0,"th",18),n.Nc(55,B,10,2,"td",16),n.Rb(),n.Nc(56,W,1,0,"tr",24),n.Nc(57,Y,1,0,"tr",25),n.Nc(58,Z,3,0,"tr",26),n.Tb(),n.Tb()),2&t&&(n.Cb(14),n.pc("ngModel",e.parentCategoryFilterValue),n.Cb(3),n.pc("ngForOf",e.parentCategoryList),n.Cb(4),n.pc("ngModel",e.categoryNameFilterValue),n.Cb(12),n.pc("dataSource",e.dataSource),n.Cb(23),n.pc("matHeaderRowDef",e.displayedColumns),n.Cb(1),n.pc("matRowDefColumns",e.displayedColumns))},directives:[s.a,h.a,r.i,l.c,l.a,g.a,g.c,c.x,c.q,c.r,b.c,b.g,u.a,c.p,c.s,f.p,d.n,m.b,c.d,h.b,x.o,D.a,x.c,x.i,x.b,x.k,x.n,x.l,x.h,D.b,x.a,c.t,p.a,M.a,M.c,r.g,R.a,x.j,x.m],pipes:[d.f],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{width:auto}"]}),t})()},{path:"new",component:w},{path:"edit/:id",component:w}];let et=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[r.j.forChild(tt)],r.j]}),t})(),at=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[i.a,et]]}),t})()}}]);