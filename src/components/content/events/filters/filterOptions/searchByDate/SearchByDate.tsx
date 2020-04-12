import React, { useContext, ChangeEvent } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import ValueLabelComponent from './ValueLabelComponent';
import { FilterContext, Filters } from '../../../../../context/GetAndFilterEvents';

export interface SearchByDateProps {}

const SearchByDate: React.SFC<SearchByDateProps> = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
    setFilters((prev: Filters) => ({ ...prev, timeFromTo: newValue }));
  };

  const marks = [
    {
      value: Date.now() / (1000 * 60 * 30),
      label: 'Dzisiaj',
    },
    {
      value: (Date.now() + 1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 30),
      label: 'Za tydzień',
    },
    {
      value: (Date.now() + 1000 * 60 * 60 * 24 * 31) / (1000 * 60 * 30),
      label: 'Za miesiąc',
    },
  ];

  return (
    <SliderStyled
      ValueLabelComponent={ValueLabelComponent}
      value={filters.timeFromTo}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider-steps"
      marks={marks}
      min={(Date.now() - 1000 * 60 * 60 * 24 * 10) / (1000 * 60 * 30)}
      max={(Date.now() + 1000 * 60 * 60 * 24 * 60) / (1000 * 60 * 30)}
    />
  );
};

export default SearchByDate;

const SliderStyled = withStyles({
  root: {
    color: '#3498db',
    height: 2,
    padding: '15px 0',
    marginTop: 20,
  },
  thumb: {
    height: 20,
    width: 20,

    backgroundColor: '#fff',
    marginTop: -10,
    marginLeft: -10,
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
    '&:nth-of-type(even)': {
      fontSize: 20,
    },
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  markLabel: {
    color: '#3498db',
    fontSize: 10,
    '@media (min-width: 960px)': {
      fontSize: 12,
    },
  },
})(Slider);
