import { FC } from 'react';
import styled from 'styled-components';

const RootDiv = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000081;
`;

export const MapLoader: FC = () => {
  return (
    <RootDiv>
      <h1 id="loading-title" style={{ color: 'white' }}>
        Loading ...
      </h1>
    </RootDiv>
  );
};
