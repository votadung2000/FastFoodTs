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

export interface LWGeo {
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

export interface LWGeoData {
    isLoadingLocation?: boolean;
    data?: LWGeo;
    filterLWGeo?: NewFilter;
}

export interface Filter {
    format?: string;
    lat?: number;
    lon?: number;
    addressdetails?: number;
}

export interface NewFilter {
    format?: string;
    geolocation?: any;
    addressdetails?: number;
}
