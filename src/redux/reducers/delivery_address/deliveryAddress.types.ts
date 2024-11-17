export interface DeliveryAddressData {
    id?: number
    created_at?: string
    updated_at?: string
    user_id?: number
    status?: number
    type?: number
    default?: number
    recipient_name?: string
    phone_number?: string
    street_address?: string
    country?: string
    city?: string
    postal_code?: string
    description?: string
    lat?: number
    lon?: number
}

export interface CurrentAddressData {
    isLoadingCurrentAddress?: boolean;
    data?: DeliveryAddressData;
}

export interface AddressData {
    data?: DeliveryAddressData[];
}

export interface RelatedAddressData {
    isLoadingAddress?: boolean;
}
