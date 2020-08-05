import Slider from '@material-ui/core/Slider';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../../../../context/GetAndFilterEvents';
import ValueLabelComponent from './ValueLabelComponent';

export interface SearchByDateProps {}

const SearchByDate: React.FC<SearchByDateProps> = () => {
  const { filters, handleChangeDate } = useContext(FilterContext);
  const marks = [
    {
      value: 8 * 24 * 2,
      label: 'Dzisiaj',
    },
    {
      value: 15 * 24 * 2,
      label: 'Za tydzień',
    },
    {
      value: 38 * 24 * 2,
      label: 'Za miesiąc',
    },
    {
      value: 68 * 24 * 2,
      label: 'Za dwa miesiące',
    },
  ];

  return (
    <SliderStyled
      ValueLabelComponent={ValueLabelComponent}
      value={filters.timeFromTo}
      onChange={handleChangeDate}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider-steps"
      marks={marks}
      min={0}
      max={80 * 24 * 2}
    />
  );
};

export default SearchByDate;

const SliderStyled = styled(Slider)`
  && .MuiSlider-root {
    color: ${(props) => props.theme.colors.slider.root};
    height: 2;
    padding: 15px 0;
    margin: 20px 0 100px;
  }
  && .MuiSlider-thumb {
    height: 20px;
    width: 20px;
    background-color: ${(props) => props.theme.colors.slider.thumb};
    margin-top: -10px;
    margin-left: -10px;
  }

  && .MuiSlider-vertical {
    left: calc(-50% + 11px);
    top: -22px;
    & * {
      background: transparent;
      color: ${(props) => props.theme.colors.slider.vertical};
    }
  }
  && .MuiSlider-track {
    height: 2px;
    background-color: ${(props) => props.theme.colors.slider.track};
  }
  && .MuiSlider-rail {
    height: 2px;
    opacity: 0.5;
    background-color: ${(props) => props.theme.colors.slider.rail};
  }
  && .MuiSlider-mark {
    background-color: ${(props) => props.theme.colors.slider.mark};
    height: 8px;
    width: 1px;
    margin-top: -3px;
    &:nth-of-type(even) {
      font-size: 20px;
    }
  }
  && .MuiSlider-markActive {
    opacity: 1;
    background-color: ${(props) => props.theme.colors.slider.markActive};
  }
  && .MuiSlider-markLabel {
    color: ${(props) => props.theme.colors.slider.markLabel};
    font-size: 10px;
    @media (min-width: 960px) {
      font-size: 12px;
    }
  }
`;
