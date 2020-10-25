export interface banner {
    _id?: string,
    name?: string,
    banner_image_url?: string,
    banner_redirect_url?: string,
    is_active?: boolean,
    type?: string,
    is_deleted?: boolean,
    category_id?: string
}

export interface bannerResponse {
    message?: string,
    data?: banner[],
    totalCount?: number
}