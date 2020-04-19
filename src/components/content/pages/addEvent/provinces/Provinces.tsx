import React from 'react';
import styled from 'styled-components';

export interface ProvincesProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  provinceChosen: string;
  setAnimationStop: React.Dispatch<React.SetStateAction<boolean>>;
}

const Provinces: React.SFC<ProvincesProps> = ({
  setFieldValue,
  provinceChosen,
  setAnimationStop,
}) => {
  console.log(provinceChosen);

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

  const handleClick = (province: string) => {
    setAnimationStop(true);
    setFieldValue('province', province);
  };
  return (
    <ProvincesContainer>
      {/* <H3>Wybierz województwo</H3> */}
      <ProvincesWrapper>
        {provinces.map((province) => (
          <Province
            onClick={() => handleClick(province)}
            key={province}
            style={province === provinceChosen ? { border: '1px solid white', color: 'white' } : {}}
          >
            {province}
          </Province>
        ))}
      </ProvincesWrapper>
    </ProvincesContainer>
  );
};

export default Provinces;

const ProvincesContainer = styled.div`
  width: 100%;
`;
// const H3 = styled.h3`
//   margin-top: 20px;
// `;
const ProvincesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0px 0 20px;
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
  &:hover {
    border: 1px solid white;
    color: white;
  }
`;
