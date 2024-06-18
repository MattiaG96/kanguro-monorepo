import { FC } from 'react';
import styled from 'styled-components';
import { Point } from '../models/PointsModel';
import { calculateDistanceKm } from '@repo/utils';

const Box = styled.div`
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 10px;
  box-shadow: 3px 3px 7px #3c3c3c;
  cursor: pointer;
`;

const Button = styled.button`
  border: 0;
  border-radius: 8px;
  background: #3c3c3c;
  box-shadow: 3px 3px 7px #3c3c3c;
  font-size: 16px;
  color: white;
  padding-block: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    box-shadow: 0 0 0 #3c3c3c;
  }
`;

interface DeliveryPointCardProps {
  userLocation?: number[];
  point: Point;
  selectedPoint?: Point;
  id?: string;

  handleChoosePoint?: (point: Point) => void;
}

export const DeliveryPointCard: FC<DeliveryPointCardProps> = ({
  userLocation,
  point,
  selectedPoint,
  handleChoosePoint = (_: Point) => console.log(_),
  id,
}) => {
  const distance = calculateDistanceKm(
    userLocation ? userLocation[1] : undefined,
    userLocation ? userLocation[0] : undefined,
    Number.parseFloat(point.latitude),
    Number.parseFloat(point.longitude),
  );

  const handleCompleteSelection = () => {
    window.top?.postMessage({ point: selectedPoint }, '*');
  };

  return (
    <Box id={id} key={point.id} onClick={() => handleChoosePoint(point)}>
      <span style={{ fontWeight: 'bold', fontSize: 18 }}>{point.name}</span>
      <span>{point.address}</span>
      <span>
        Schedule:
        <span style={{ fontWeight: 'bold' }}> {point.schedule}</span>
      </span>
      {distance !== 'NaN' && (
        <span>
          Distance:{' '}
          <span style={{ color: 'blue', fontWeight: 'bold' }}>
            {distance}Km
          </span>
        </span>
      )}
      {selectedPoint?.id === point.id && (
        <Button
          id={`delivery-point-card-selecet-button-${point.id}`}
          type="button"
          onClick={handleCompleteSelection}
        >
          Select delivery point
        </Button>
      )}
    </Box>
  );
};
