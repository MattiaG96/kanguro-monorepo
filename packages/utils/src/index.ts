import { deg2rad } from './utils';

const calculateDistanceKm = (
  lat1?: number,
  lon1?: number,
  lat2?: number,
  lon2?: number,
) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 'NaN';
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(2);
};

export { calculateDistanceKm };
