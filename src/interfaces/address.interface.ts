export interface AddressData {
    name: string;
    address: string;
    postalCode: string;
    cityId: string;
    regionId: string;
    userId: string;
}

export interface AddressWithCityAndRegion {
    id: string;
    name: string;
    address: string;
    postalCode: string;
    cityId: string;
    regionId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    city: {
        name: string;
    };
    region: {
        name: string;
    };
}
