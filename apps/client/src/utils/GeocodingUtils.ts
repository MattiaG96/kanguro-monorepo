import { EventData, FlyToOptions, LngLatLike } from 'mapbox-gl';
import { GeocodingModel } from '../models/GeocodingModel';

export const searchAddress = (
  address: string,
  setMapCenter: (value: number[]) => void,
  flyTo?: (options: FlyToOptions, eventData?: EventData | undefined) => void,
) => {
  fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURI(address)}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`,
  )
    .then((response) => response.json())
    .then((data: GeocodingModel) => {
      setMapCenter(data.features[0].geometry.coordinates);
      if (!flyTo) {
        window.alert('Something went wrong with the map.');
        return;
      }
      flyTo({ center: data.features[0].geometry.coordinates as LngLatLike });
    })
    .catch((error) => window.alert(error.message))
    .catch((error) => window.alert(error.message));
};
