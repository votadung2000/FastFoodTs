export type Image = {
    id?: number
    created_at?: string
    updated_at?: string
    url?: string
    width?: number
    height?: number
    cloud_name?: string
    extension?: string
}

export type Root = {
    status_code?: number
    data?: any
    filter?: Filter
    paging?: Paging
}

export type Filter = {}

export type Paging = {
    page?: number
    limit?: number
    total?: number
}
