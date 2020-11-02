export interface packagingMaterial {
    item_id?:string,
    item_quantity?:number,
    item_unit_id?:string
}

export interface unit{
    _id?:string,
    name?:string,
    packaging_material_consumed?: packagingMaterial[],
    base_quantity?:number,
    base_unit?:string,
    is_active?:boolean,
    created_at?:number,
    
}

export interface unitResponse {
    message?:string,
    data?:unit[]
    totalCount?:number
}

export interface unitDetailResponse{
    message?:unit
}

export interface item{
    _id?:string,
    name?:string
}

export interface itemResponse {
    message?:string,
    data?:item[]
}