type LocationType = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

type RatesType = {
  nightly?: number;
  weekly: number;
  monthly?: number;
};

type SellerInfoType = {
  name: string;
  email: string;
  phone: string;
};

export type PropertyType = {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: LocationType;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: RatesType;
  seller_info: SellerInfoType;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};
