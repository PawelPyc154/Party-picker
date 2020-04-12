import React from 'react';
import Slider from '@material-ui/core/Slider';

export interface SearchByDateProps {}

const SearchByDate: React.SFC<SearchByDateProps> = () => {
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
  );
};

export default SearchByDate;
