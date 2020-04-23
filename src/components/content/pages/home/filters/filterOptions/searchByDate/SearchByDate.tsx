import React, { useContext } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core';
import ValueLabelComponent from './ValueLabelComponent';
import { FilterContext } from '../../../../../../../context/GetAndFilterEvents';

export interface SearchByDateProps {}

const SearchByDate: React.SFC<SearchByDateProps> = () => {
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
