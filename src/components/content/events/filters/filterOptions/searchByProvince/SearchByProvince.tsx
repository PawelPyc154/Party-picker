import React, {useContext} from "react";
import {FilterContext} from "../../../../../context/GetAndFilterEvents";
import styled from "styled-components";
export interface SearchByProvinceProps {}

const SearchByProvince: React.SFC<SearchByProvinceProps> = () => {
  const {filters, handleChangeFilters} = useContext(FilterContext);
  const provinces = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];
  return (
    <ProvincesWrapper>
      {provinces.map((province) => (
        <Province
          onClick={() => handleChangeFilters(province, "province")}
          key={province}
          style={
            province === filters.province
              ? {border: "1px solid white", color: "white"}
              : {}
          }
        >
          {province}
        </Province>
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
const Province = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 10px 10px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  cursor: pointer;
`;
