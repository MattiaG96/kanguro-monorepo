import { FC } from 'react';
import { Point } from '../models/PointsModel';
import styled from 'styled-components';
import { useMap } from 'react-map-gl';
import { DeliveryPointCard } from './DeliveryPointCard';

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface DeliveryPointsListProps {
  userLocation: number[];
  pointsList: Point[];
  selectedPoint?: Point;
  selectDeliveryPoint: (point: Point) => void;
}

export const DeliveryPointsList: FC<DeliveryPointsListProps> = ({
  pointsList,
  userLocation,
  selectedPoint,
  selectDeliveryPoint,
}) => {
  const { mainMap } = useMap();

  const handleChoosePoint = (point: Point) => {
    selectDeliveryPoint(point);
    mainMap?.flyTo({
      center: [
        Number.parseFloat(point.longitude),
        Number.parseFloat(point.latitude),
      ],
    });
  };

  return (
    <RootDiv>
      {pointsList.length > 0 &&
        pointsList.map((point) => {
          return (
            <DeliveryPointCard
              id={`${point.id}`}
              key={point.id}
              userLocation={userLocation}
              point={point}
              selectedPoint={selectedPoint}
              handleChoosePoint={handleChoosePoint}
            />
          );
        })}
    </RootDiv>
  );
};
