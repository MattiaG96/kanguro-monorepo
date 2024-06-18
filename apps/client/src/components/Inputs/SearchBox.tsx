import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { MagnifyingGlassIcon } from '../../assets/icons/MagnifyingGlassIcon';
import { searchAddress } from '../../utils/GeocodingUtils';
import { useMap } from 'react-map-gl';

const RootDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  border: 0;
  cursor: pointer;
  outline: none;
  box-shadow: 3px 3px 7px #3c3c3c;
  background-color: #3c3c3c;

  &:hover {
    box-shadow: 0 0 0 #3c3c3c;
  }
`;

interface SearchBoxProps {
  id?: string;
  searchValue: string;
  searchOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setMapCenter: (value: number[]) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({
  id,
  searchValue,
  searchOnChange,
  setMapCenter,
}) => {
  const { mainMap } = useMap();
  const onSearch = () =>
    searchAddress(searchValue, setMapCenter, mainMap?.flyTo);
  return (
    <RootDiv>
      <Input
        id={id}
        placeholder="Write an address"
        value={searchValue}
        onChange={searchOnChange}
      />
      <SearchButton
        id="search-box-search-button"
        type="button"
        onClick={onSearch}
      >
        <MagnifyingGlassIcon width={18} height={18} color="white" />
      </SearchButton>
    </RootDiv>
  );
};
