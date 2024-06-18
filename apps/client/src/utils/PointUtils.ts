import { Point } from '../models/PointsModel';
import { API } from '../network/API';

export const getDeliveryPoints = (
  setDeliveryPoints: (points: Point[]) => void,
  currentLocation?: number[],
) => {
  if (!currentLocation) return setDeliveryPoints([]);
  API.getPoints(currentLocation[0], currentLocation[1])
    .then((response) => {
      setDeliveryPoints(response);
    })
    .catch((error) => window.alert(error));
};
