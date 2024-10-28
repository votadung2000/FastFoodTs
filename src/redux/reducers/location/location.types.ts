interface Address {
    tourism?: string;
    house_number?: string;
    road?: string;
    quarter?: string;
    suburb?: string;
    city?: string;
    'ISO3166-2-lvl4'?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
}

export interface Location {
    place_id?: number;
    licence?: string;
    osm_type?: string;
    osm_id?: number;
    lat?: string;
    lon?: string;
    class?: string;
    type?: string;
    place_rank?: number;
    importance?: number;
    addresstype?: string;
    name?: string;
    display_name?: string;
    address?: Address;
    boundingbox?: string[];
}

// location with geolocation
export interface LWGeoData {
    isLoadingLWGeo?: boolean;
    data?: Location;
    filterLWGeo?: NewFilterLWGeo;
}

export interface FilterLWGeo {
    format?: string;
    lat?: number;
    lon?: number;
    addressdetails?: number;
}

export interface NewFilterLWGeo {
    format?: string;
    geolocation?: any;
    addressdetails?: number;
}

// location with address
export interface LWAddressData {
    isLoadingLWAddress?: boolean;
    data?: Location[];
    filterLWAddress?: NewFilterLWAddress;
}

export interface FilterLWAddress {
    format?: string;
    q?: string;
    addressdetails?: number;
}

export interface NewFilterLWAddress {
    format?: string;
    address?: string;
    addressdetails?: number;
}

// location params
export interface GeoLocation {
    lat?: number;
    lon?: number;
}
