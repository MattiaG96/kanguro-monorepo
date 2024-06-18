export interface GeocodingModel {
  features: GeocodingData[];
}

interface GeocodingData {
  geometry: {
    coordinates: number[];
  };
}
