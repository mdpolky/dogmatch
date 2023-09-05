import { MultiValue, SingleValue } from "react-select";

export type HttpMethod = "GET" | "POST";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogSearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort: string;
}

export interface ReactSelectOption {
  value: string;
  label: string;
}

export interface SearchFilters {
  breeds: ReactSelectOption[];
  searchParams: DogSearchParams;
  favoriteDogs: Dog[];
  handleBreedSelector: (selectedItems: MultiValue<ReactSelectOption>) => void;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSortSelector: (selectedItem: SingleValue<ReactSelectOption>) => void;
  handleMatch: () => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/*
  interface GeoBoundingBox {
    top?: {
      lat: number;
      lon: number;
    };
    left?: {
      lat: number;
      lon: number;
    };
    bottom?: {
      lat: number;
      lon: number;
    };
    right?: {
      lat: number;
      lon: number;
    };
    bottom_left?: {
      lat: number;
      lon: number;
    };
    top_right?: {
      lat: number;
      lon: number;
    };
    bottom_right?: {
      lat: number;
      lon: number;
    };
    top_left?: {
      lat: number;
      lon: number;
    };
  }
  
  type GeoBoundingBoxCombination =
    | "top_left_bottom_right"
    | "bottom_left_top_right"
    | "bottom_right_top_left";
  
  type GeoBoundingBoxWithOneCombination = {
    [key in GeoBoundingBoxCombination]: {
      lat: number;
      lon: number;
    };
  };
  
  interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
  }
  
  interface LocationSearchParams {
    city?: string;
    states?: string[];
    geoBoundingBox?: GeoBoundingBoxWithOneCombination;
    size?: number;
    from?: string;
  }
  
  interface LocationSearchResponse {
    results: Location[];
    total: number;
  }
  
  interface Match {
    match: string;
  }
  */
