import { Point } from '../models/PointsModel';
import { get } from './Network';

export const API = {
  getPoints: (lng: number, lat: number) =>
    get<Point[]>(`/api/points/${lng}/${lat}`),
};
