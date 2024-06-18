import { FC, useState } from 'react';
import styled from 'styled-components';
import { Point } from '../models/PointsModel';
import { DeliveryPointCard } from '../components/DeliveryPointCard';

const RootElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const IFrame = styled.iframe`
  width: 100%;
  flex: 1;
  border: 0;
  overflow-y: hidden;
`;

const Button = styled.button`
  background-color: #3c3c3c;
  color: white;
  border: 0;
  border-radius: 8px;
  padding-block: 10px;
  padding-inline: 20px;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const CheckOut: FC = () => {
  const [iFrameVisible, setIFrameVisibel] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<Point>();
  const handleIFrameVisibility = () => setIFrameVisibel(!iFrameVisible);
  window.addEventListener('message', (event) => {
    if (event.data.point) {
      setSelectedPoint(event.data.point);
      setIFrameVisibel(false);
    }
  });
  return (
    <RootElement>
      <Button
        id="checkout-delivery-point-button"
        type="button"
        onClick={handleIFrameVisibility}
      >
        Choose Delivery Point
      </Button>
      {iFrameVisible && (
        <IFrame
          id="checkout-delivery-point-iframe"
          src={`${import.meta.env.VITE_BASE_URL}/delivery-chooser`}
        />
      )}
      {selectedPoint && !iFrameVisible && (
        <DeliveryPointCard
          point={selectedPoint}
          id="checkout-delivery-point-box"
        />
      )}
    </RootElement>
  );
};

export default CheckOut;
