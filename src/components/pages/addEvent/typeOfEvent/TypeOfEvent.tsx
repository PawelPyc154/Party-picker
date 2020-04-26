import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

export interface TypeOfEventProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  typeOfEventChosen: string;
}

const TypeOfEvent: React.FC<TypeOfEventProps> = ({ setFieldValue, typeOfEventChosen }) => {
  const typesOfEvent = ['club', 'piknik', 'koncert', 'zlot', 'targi', 'impreza taneczka', 'inne'];

  const handleClick = (typeOfEvent: string) => {
    setFieldValue('typeOfEvent', typeOfEvent);
  };
  return (
    <TypeOfEventContainer>
      <EventTypeWrapper>
        {typesOfEvent.map((item, index) => (
          <EventType
            type="button"
            onClick={() => handleClick(item)}
            key={item}
            style={item === typeOfEventChosen ? { border: '1px solid white', color: 'white' } : {}}
            initial="hidden"
            variants={{
              visible: {
                x: 0,
                opacity: 1,
                transition: { delay: index * 0.05 + 0.4, duration: 0.2 },
              },
              hidden: {
                x: 100,
                opacity: 0,
                transition: { delay: index * 0.05 + 0.4, duration: 0.2 },
              },
            }}
          >
            {item}
          </EventType>
        ))}
      </EventTypeWrapper>
    </TypeOfEventContainer>
  );
};

export default TypeOfEvent;

const TypeOfEventContainer = styled.div`
  width: 100%;
`;

const EventTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  width: calc(100% + 20px);
  transform: translateX(-10px);
`;
const EventType = styled(motion.button)`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 15px 10px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    color: white;
  }
`;
