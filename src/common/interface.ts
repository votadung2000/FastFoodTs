export interface ApiBody {
    [key: string]: any;
}

export interface Image {
    id?: number
    created_at?: string
    updated_at?: string
    url?: string
    width?: number
    height?: number
    cloud_name?: string
    extension?: string
}

interface Filter { }

export interface Root {
    status_code?: number
    data?: any
    filter?: Filter
    paging?: Paging
}

export interface Paging {
    page?: number
    limit?: number
    total?: number
}

export interface Params {
    [key: string]: any;
}
