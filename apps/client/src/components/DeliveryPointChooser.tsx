import { ChangeEvent, FC, useEffect, useState } from 'react';
import { setMapCenterUtility } from '../utils/MapUtils';
import Map, { MapProvider, Marker } from 'react-map-gl';
import { SearchBox } from './Inputs/SearchBox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPinIcon } from '../assets/icons/MapPinIcon';
import { Point } from '../models/PointsModel';
import { DeliveryPointsList } from './DeliveryPointsList';
import styled from 'styled-components';
import { MapLoader } from './MapLoader';
import { getDeliveryPoints } from '../utils/PointUtils';

const MapControls = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 74vh;
  width: 25%;

  @media (max-width: 800px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    position: relative;
    width: 95%;
    height: fit-content;
    max-height: 45vh;
    margin-bottom: 20px;
    gap: 0;
  }
`;

const DeliveryPointChooser: FC = () => {
  const [mapCenter, setMapCenter] = useState<number[]>();
  const [deliveryPoints, setDeliveryPoints] = useState<Point[]>([]);

  const [selectedPoint, setSelectedPoint] = useState<Point>();
  const handleSelectDeliveryPoint = (point: Point) => setSelectedPoint(point);

  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const getPoints = () => getDeliveryPoints(setDeliveryPoints, mapCenter);

  useEffect(() => {
    if (!mapCenter) {
      setMapCenterUtility(setMapCenter);
    }
    getPoints();
  }, [mapCenter]);

  if (!mapCenter) {
    return <MapLoader />;
  }

  return (
    <div id="delivery-point-chooser-root-element">
      <MapProvider>
        {mapCenter && (
          <>
            <MapControls>
              <SearchBox
                searchValue={searchValue}
                searchOnChange={handleSearchValueChange}
                setMapCenter={setMapCenter}
              />
              <DeliveryPointsList
                pointsList={deliveryPoints}
                userLocation={mapCenter}
                selectDeliveryPoint={handleSelectDeliveryPoint}
                selectedPoint={selectedPoint}
              />
            </MapControls>
            <Map
              id="mainMap"
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
              initialViewState={{
                longitude: mapCenter[0],
                latitude: mapCenter[1],
                zoom: 15,
              }}
              style={{
                width: '100%',
                height: '80vh',
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={mapCenter[0]}
                latitude={mapCenter[1]}
                anchor="center"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <MapPinIcon width={18} height={18} color="red" />
                <span
                  style={{
                    background: 'white',
                    padding: 5,
                    borderRadius: 5,
                    marginTop: 5,
                    fontWeight: 'bold',
                  }}
                >
                  You're here
                </span>
              </Marker>

              {deliveryPoints.map((item) => {
                return (
                  <Marker
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelectDeliveryPoint(item)}
                    key={item.id}
                    longitude={Number.parseFloat(item.longitude)}
                    latitude={Number.parseFloat(item.latitude)}
                    anchor="bottom"
                  >
                    <MapPinIcon
                      id={`${item.id}`}
                      width={item.id === selectedPoint?.id ? 32 : 22}
                      height={item.id === selectedPoint?.id ? 32 : 22}
                      color={item.id === selectedPoint?.id ? 'green' : 'blue'}
                    />
                  </Marker>
                );
              })}
            </Map>
          </>
        )}
      </MapProvider>
    </div>
  );
};

export default DeliveryPointChooser;
