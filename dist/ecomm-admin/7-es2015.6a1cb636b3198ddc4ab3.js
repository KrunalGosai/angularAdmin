(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{jR2d:function(t,e,a){"use strict";a.r(e),a.d(e,"CategoriesModule",(function(){return Z}));var i=a("PCNd"),r=a("tyNb"),o=a("uEtv"),c=a("3Pt+"),n=a("fXoL"),s=a("tgey"),l=a("XiUz"),b=a("Wp6s"),g=a("kmnG"),m=a("qFsG"),d=a("ofXK"),u=a("d3UM"),p=a("1jcm"),f=a("bTqV"),h=a("FKr1"),y=a("sYmb");function C(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function U(t,e){if(1&t&&(n.Ub(0,"mat-option",15),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function T(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}function F(t,e){1&t&&(n.Ub(0,"mat-error"),n.Pc(1),n.hc(2,"translate"),n.Tb()),2&t&&(n.Cb(1),n.Rc(" ",n.ic(2,1,"validations.required")," "))}const v=function(){return["home","categories","new"]};let P=(()=>{class t{constructor(t,e,a,i){this.fb=t,this.router=e,this.activeRoute=a,this.categoryFacade=i,this.isEditMode=!1,this.activeEditId="",this.categoryForm=this.fb.group({name:["",[c.w.required]],parent:[""],sort:[1],isactive:!0,category_image:[""],category_img_name:[""],img_file:[null]}),this.activeRoute.params.subscribe(t=>{null!=t.id&&null!=t.id&&""!=t.id&&(this.isEditMode=!0,this.activeEditId=t.id)})}ngOnInit(){this.categoryFacade.loadParentCategories(),this.categoryFacade.getParentCategories().subscribe(t=>{this.categoryList=t}),this.isEditMode&&this.categoryFacade.getCategoryDetails(this.activeEditId).then(t=>{let e=t;e=e.categoryDetail,console.log({result:t}),this.categoryForm.patchValue({name:e.name,parent:e.parent_categoriesIds.length>0?e.parent_categoriesIds[0]:"",category_img_name:e.category_image,isactive:e.is_active})}).catch(t=>console.error(t))}fileUpladChange(t){let e=t.target.files;if(e&&null!=e&&e.length>0){let t=e[0];this.categoryForm.get("category_img_name").setValue(t.name),this.categoryForm.get("img_file").setValue(t)}else this.categoryForm.get("category_img_name").reset()}onFormSubmit(t){if(this.categoryForm.valid)if(this.isEditMode){let t=this.categoryForm.value;t.id=this.activeEditId,this.categoryFacade.updateCategory(t).then(t=>{this.categoryForm.reset(),this.router.navigate(["categories"])})}else this.categoryFacade.newCategory(this.categoryForm.value).then(t=>{this.categoryForm.reset(),this.router.navigate(["categories"])}).catch(t=>{})}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(c.f),n.Ob(r.f),n.Ob(r.a),n.Ob(o.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-categories-components-category-add"]],decls:37,vars:9,consts:[[3,"title","nav"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100","fxFlex.lt-sm","100",1,"matero-col"],[1,"form-field-full",3,"formGroup","submit"],["fxLayout","row wrap","fxLayoutGap","8px grid"],["fxFlex","50","fxFlex.lt-sm","100"],["matInput","","placeholder","Category Name","formControlName","name","required",""],[4,"ngIf"],["formControlName","parent","placeholder","Parent Category"],[3,"value",4,"ngFor","ngForOf"],["fxFlex","25","fxFlex.lt-sm","100"],["matInput","","placeholder","Sort Order","formControlName","sort","required","","type","number"],["matInput","","placeholder","Image URL","type","text","formControlName","category_image","required",""],["formControlName","isactive","color","primary"],["mat-raised-button","","color","primary","type","submit",1,"m-t-8"],[3,"value"]],template:function(t,e){1&t&&(n.Pb(0,"page-header",0),n.Ub(1,"div",1),n.Ub(2,"div",2),n.Ub(3,"mat-card"),n.Ub(4,"mat-card-title"),n.Pc(5),n.Tb(),n.Ub(6,"form",3),n.cc("submit",(function(t){return e.onFormSubmit(t)})),n.Ub(7,"div",4),n.Ub(8,"div",5),n.Ub(9,"mat-form-field"),n.Ub(10,"mat-label"),n.Pc(11,"Name"),n.Tb(),n.Pb(12,"input",6),n.Nc(13,C,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(14,"div",5),n.Ub(15,"mat-form-field"),n.Ub(16,"mat-label"),n.Pc(17,"Parent Category"),n.Tb(),n.Ub(18,"mat-select",8),n.Nc(19,U,2,2,"mat-option",9),n.Tb(),n.Tb(),n.Tb(),n.Ub(20,"div",10),n.Ub(21,"mat-form-field"),n.Ub(22,"mat-label"),n.Pc(23,"Position"),n.Tb(),n.Pb(24,"input",11),n.Nc(25,T,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(26,"div",10),n.Ub(27,"mat-form-field"),n.Ub(28,"mat-label"),n.Pc(29,"Image URL"),n.Tb(),n.Pb(30,"input",12),n.Nc(31,F,3,3,"mat-error",7),n.Tb(),n.Tb(),n.Ub(32,"div",10),n.Ub(33,"mat-slide-toggle",13),n.Pc(34," Is Active "),n.Tb(),n.Tb(),n.Tb(),n.Ub(35,"button",14),n.Pc(36,"Save"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()),2&t&&(n.qc("title",e.isEditMode?"Edit Category":"New Category"),n.pc("nav",n.rc(8,v)),n.Cb(5),n.Rc("",e.isEditMode?"Edit Category":"New Category"," "),n.Cb(1),n.pc("formGroup",e.categoryForm),n.Cb(7),n.pc("ngIf",e.categoryForm.get("name").invalid),n.Cb(6),n.pc("ngForOf",e.categoryList),n.Cb(6),n.pc("ngIf",e.categoryForm.get("sort").invalid),n.Cb(6),n.pc("ngIf",e.categoryForm.get("category_image").invalid))},directives:[s.a,l.c,l.a,b.a,b.c,c.x,c.q,c.k,l.d,g.c,g.g,m.b,c.d,c.p,c.i,c.v,d.o,u.a,d.n,c.t,p.a,f.b,g.b,h.p],pipes:[y.d],styles:[""]}),t})();var _=a("Xibt"),w=a("Dh3D"),N=a("+0xr"),x=a("zkoq"),D=a("NFeN");function I(t,e){if(1&t&&(n.Ub(0,"mat-option",26),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.pc("value",t._id),n.Cb(1),n.Qc(t.name)}}function M(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Position "),n.Tb())}const R=function(){return{standalone:!0}};function S(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",28),n.Ub(1,"input",29),n.cc("change",(function(){n.Dc(t);const a=e.$implicit;return n.gc().categoryPositionChanged(a)}))("ngModelChange",(function(a){return n.Dc(t),e.$implicit.category_sort=a})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModelOptions",n.rc(2,R))("ngModel",t.category_sort)}}function V(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Category Image "),n.Tb())}function O(t,e){if(1&t&&(n.Ub(0,"td",28),n.Pb(1,"img",30),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.qc("src",t.category_image,n.Fc)}}function k(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Name "),n.Tb())}function E(t,e){if(1&t&&(n.Ub(0,"td",28),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.name," ")}}function L(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Parent "),n.Tb())}function q(t,e){if(1&t&&(n.Ub(0,"span"),n.Pc(1),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",t.name," ")}}function $(t,e){if(1&t&&(n.Ub(0,"td",28),n.Nc(1,q,2,1,"span",31),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.pc("ngForOf",t.parent_categoriesIds)}}function A(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Created On "),n.Tb())}function j(t,e){if(1&t&&(n.Ub(0,"td",28),n.Pc(1),n.hc(2,"date"),n.Tb()),2&t){const t=e.$implicit;n.Cb(1),n.Rc(" ",n.ic(2,1,t.created_at)," ")}}function z(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Active "),n.Tb())}function G(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",28),n.Ub(1,"mat-slide-toggle",32),n.cc("ngModelChange",(function(a){return n.Dc(t),e.$implicit.is_active=a}))("change",(function(){n.Dc(t);const a=e.$implicit;return n.gc().changeActivationStatus(a)})),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(1),n.pc("ngModel",t.is_active)}}function H(t,e){1&t&&(n.Ub(0,"th",27),n.Pc(1," Controls "),n.Tb())}const X=function(t){return["edit",t]};function Q(t,e){if(1&t){const t=n.Vb();n.Ub(0,"td",28),n.Ub(1,"mat-grid-list",33),n.Ub(2,"mat-grid-tile"),n.Ub(3,"button",34),n.Ub(4,"mat-icon",35),n.Pc(5,"create"),n.Tb(),n.Tb(),n.Tb(),n.Ub(6,"mat-grid-tile"),n.Ub(7,"button",36),n.cc("click",(function(){n.Dc(t);const a=e.$implicit;return n.gc().deleteIcon(a._id)})),n.Ub(8,"mat-icon",37),n.Pc(9,"delete"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb()}if(2&t){const t=e.$implicit;n.Cb(3),n.pc("routerLink",n.sc(1,X,t._id))}}function J(t,e){1&t&&n.Pb(0,"tr",38)}function K(t,e){1&t&&n.Pb(0,"tr",39)}function W(t,e){if(1&t&&(n.Ub(0,"tr",40),n.Ub(1,"td",41),n.Pc(2),n.Tb(),n.Tb()),2&t){n.gc();const t=n.zc(31);n.Cb(2),n.Rc('No data matching the filter "',t.value,'"')}}const Y=[{path:"",component:(()=>{class t{constructor(t,e){this.categoriesFacade=t,this.confirmService=e,this.displayedColumns=["category_sort","category_image","name","parent","created_at","is_active","controls"],this.parentCategoryFilterValue="",this.categoryNameFilterValue="",this.pageDetails={currentPage:1,itemsPerPage:200,totalRecords:200},this.q={username:"",email:"",gender:""}}ngOnInit(){this.categoriesFacade.loadCategories(),this.categoriesFacade.loadParentCategories(),this.categoriesFacade.getCategories().subscribe(t=>{this.dataSource=new N.p(t.data),this.pageDetails.totalRecords=t.categryCount}),this.categoriesFacade.getParentCategories().subscribe(t=>{this.parentCategoryList=t})}ngAfterViewInit(){this.dataSource.sort=this.sort}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase()}pageEvent(t){this.pageDetails.itemsPerPage=t.pageSize,this.pageDetails.currentPage=t.pageIndex+1,this.categoriesFacade.loadCategories(this.pageDetails.currentPage,t.pageSize,this.parentCategoryFilterValue,this.categoryNameFilterValue)}deleteIcon(t){this.confirmService.confirm("Are you sure want to delete this category?","Confirm").subscribe(e=>{1==e&&this.categoriesFacade.deleteCategory(t).then(t=>this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue))})}changeActivationStatus(t){this.categoriesFacade.changeActivationStatus(t._id,t.is_active)}navigateToEdit(t){}filterCategories(){this.categoriesFacade.loadCategories(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.parentCategoryFilterValue,this.categoryNameFilterValue)}resetFilter(){this.categoryNameFilterValue="",this.parentCategoryFilterValue=""}categoryPositionChanged(t){let e={id:t._id,name:t.name,isactive:t.is_active,sort:t.category_sort,category_image:t.category_image};null!=t.parent_categoriesIds&&null!=t.parent_categoriesIds&&t.parent_categoriesIds.length>0&&(e.parent=t.parent_categoriesIds[0]._id),this.categoriesFacade.updateCategory(e)}}return t.\u0275fac=function(e){return new(e||t)(n.Ob(o.a),n.Ob(_.a))},t.\u0275cmp=n.Ib({type:t,selectors:[["app-categories-components-category-list"]],viewQuery:function(t,e){var a;1&t&&n.Sc(w.a,!0),2&t&&n.yc(a=n.dc())&&(e.sort=a.first)},decls:59,vars:6,consts:[["mat-raised-button","","aria-label","View basic sidenav example","color","primary","routerLink","new"],["fxLayout","row wrap",1,"matero-row"],["fxFlex","100",1,"matero-col"],["fxFlex","25","fxFlex.lt-sm","100",1,"matero-col"],["name","parentCategory",3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","placeholder","Category Name","name","name",3,"ngModel","ngModelChange"],["mat-raised-button","","color","primary",2,"margin-right","5px",3,"click"],["mat-raised-button","",3,"click"],["matInput","","placeholder","Ex. Abc",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","category_sort"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","category_image"],["matColumnDef","name"],["matColumnDef","parent"],["matColumnDef","created_at"],["matColumnDef","is_active"],["matColumnDef","controls"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["type","number",2,"max-width","100px",3,"ngModelOptions","ngModel","change","ngModelChange"],["alt","Category Image","width","100px","height","50px",3,"src"],[4,"ngFor","ngForOf"],["color","primary",3,"ngModel","ngModelChange","change"],["cols","2","rowHeight","50px"],["mat-icon-button","","aria-label","Edit",3,"routerLink"],["color","primary"],["mat-icon-button","","aria-label","Delete",3,"click"],["color","accent"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","4",1,"mat-cell"]],template:function(t,e){1&t&&(n.Pb(0,"page-header"),n.Ub(1,"section"),n.Ub(2,"a",0),n.Pc(3," Add New "),n.Tb(),n.Tb(),n.Pb(4,"br"),n.Ub(5,"div",1),n.Ub(6,"div",2),n.Ub(7,"mat-card"),n.Ub(8,"mat-card-title"),n.Pc(9,"Filter"),n.Tb(),n.Ub(10,"form"),n.Ub(11,"mat-form-field",3),n.Ub(12,"mat-label"),n.Pc(13,"Parent Category"),n.Tb(),n.Ub(14,"mat-select",4),n.cc("ngModelChange",(function(t){return e.parentCategoryFilterValue=t})),n.Ub(15,"mat-option",5),n.Pc(16,"--Select--"),n.Tb(),n.Nc(17,I,2,2,"mat-option",6),n.Tb(),n.Tb(),n.Ub(18,"mat-form-field",3),n.Ub(19,"mat-label"),n.Pc(20,"Category Name"),n.Tb(),n.Ub(21,"input",7),n.cc("ngModelChange",(function(t){return e.categoryNameFilterValue=t})),n.Tb(),n.Tb(),n.Ub(22,"div",3),n.Ub(23,"button",8),n.cc("click",(function(){return e.filterCategories()})),n.Pc(24,"Search"),n.Tb(),n.Ub(25,"button",9),n.cc("click",(function(){return e.resetFilter()})),n.Pc(26,"Reset"),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Tb(),n.Ub(27,"mat-form-field"),n.Ub(28,"mat-label"),n.Pc(29,"Search"),n.Tb(),n.Ub(30,"input",10,11),n.cc("keyup",(function(t){return e.applyFilter(t)})),n.Tb(),n.Tb(),n.Ub(32,"div",12),n.Ub(33,"table",13),n.Sb(34,14),n.Ub(35,"form"),n.Nc(36,M,2,0,"th",15),n.Nc(37,S,2,3,"td",16),n.Tb(),n.Rb(),n.Sb(38,17),n.Nc(39,V,2,0,"th",15),n.Nc(40,O,2,1,"td",16),n.Rb(),n.Sb(41,18),n.Nc(42,k,2,0,"th",15),n.Nc(43,E,2,1,"td",16),n.Rb(),n.Sb(44,19),n.Nc(45,L,2,0,"th",15),n.Nc(46,$,2,1,"td",16),n.Rb(),n.Sb(47,20),n.Nc(48,A,2,0,"th",15),n.Nc(49,j,3,3,"td",16),n.Rb(),n.Sb(50,21),n.Nc(51,z,2,0,"th",15),n.Nc(52,G,2,1,"td",16),n.Rb(),n.Sb(53,22),n.Nc(54,H,2,0,"th",15),n.Nc(55,Q,10,3,"td",16),n.Rb(),n.Nc(56,J,1,0,"tr",23),n.Nc(57,K,1,0,"tr",24),n.Nc(58,W,3,1,"tr",25),n.Tb(),n.Tb()),2&t&&(n.Cb(14),n.pc("ngModel",e.parentCategoryFilterValue),n.Cb(3),n.pc("ngForOf",e.parentCategoryList),n.Cb(4),n.pc("ngModel",e.categoryNameFilterValue),n.Cb(12),n.pc("dataSource",e.dataSource),n.Cb(23),n.pc("matHeaderRowDef",e.displayedColumns),n.Cb(1),n.pc("matRowDefColumns",e.displayedColumns))},directives:[s.a,f.a,r.i,l.c,l.a,b.a,b.c,c.x,c.q,c.r,g.c,g.g,u.a,c.p,c.s,h.p,d.n,m.b,c.d,f.b,N.o,w.a,N.c,N.i,N.b,N.k,N.n,N.l,N.h,w.b,N.a,c.t,p.a,x.a,x.c,r.g,D.a,N.j,N.m],pipes:[d.f],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{width:auto}"]}),t})()},{path:"new",component:P},{path:"edit/:id",component:P}];let B=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[r.j.forChild(Y)],r.j]}),t})(),Z=(()=>{class t{}return t.\u0275mod=n.Mb({type:t}),t.\u0275inj=n.Lb({factory:function(e){return new(e||t)},imports:[[i.a,B]]}),t})()}}]);