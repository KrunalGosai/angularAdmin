export interface userListResponse{
    message?:string,
    userList?: any[],
    totalCount?: number
}

export interface userList{
    _id?:string;
    name?: string;
    avatar?: string;
    email?: string;
    token?: string;
    last_login?: number;
    is_active?: boolean;
    account_verified?: boolean;
    first_name?: string;
    last_name?: string;
    contact_2?: string;
    contact?: string;
    current_address?: string;
    permanent_address?: string;
    gender?: string;
    dob?: string;
    family_details?: string;
    previous_occupation?: string;
    bank_details?: string;
    vehicle?: any;
    profile_pic?: boolean;
    role_id?: {
        _id?: string;
        type?: string;
    }   
}