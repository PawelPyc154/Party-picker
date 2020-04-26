import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../../../../../context/GetAndFilterEvents';
import Button from '../../../../../universalComponents/Button';

export interface SearchByProvinceProps {}

const SearchByProvince: React.FC<SearchByProvinceProps> = () => {
  const { filters, handleChangeFilters } = useContext(FilterContext);
  const provinces = [
    'dolnośląskie',
    'kujawsko-pomorskie',
    'lubuskie',
    'łódzkie',
    'małopolskie',
    'mazowieckie',
    'opolskie',
    'podkarpackie',
    'podlaskie',
    'pomorskie',
    'śląskie',
    'świętokrzyskie',
    'warmińsko-mazurskie',
    'wielkopolskie',
    'zachodniopomorskie',
  ];
  return (
    <ProvincesWrapper>
      {provinces.map((province) => (
        <Button
          margin="10px 10px"
          onClick={() => handleChangeFilters(province, 'province')}
          key={province}
          style={province === filters.province ? { border: '1px solid white', color: 'white' } : {}}
        >
          {province}
        </Button>
      ))}
    </ProvincesWrapper>
  );
};

export default SearchByProvince;

const ProvincesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
  width: calc(100% + 20px);
  transform: translateX(-10px);
`;
