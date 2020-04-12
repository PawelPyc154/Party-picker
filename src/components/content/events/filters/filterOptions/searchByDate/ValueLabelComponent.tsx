import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';

const ValueLabelComponent = (props: any) => {
  const { children, open, value } = props;
  const daysName = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  const hours = new Date(value * 60 * 1000 * 30).getHours();
  const minutes =
    new Date(value * 60 * 1000 * 30).getMinutes() === 0
      ? `${new Date(value * 60 * 1000 * 30).getMinutes()}0`
      : new Date(value * 60 * 1000 * 30).getMinutes();
  const day = new Date(value * 60 * 1000 * 30).getDate();
  const month = new Date(value * 60 * 1000 * 30).getMonth();
  const dayName = daysName[new Date(value * 60 * 1000 * 30).getDay()];
  const date = `${hours}:${minutes} ${day}.${month} ${dayName}`;
  return (
    <Tooltip open={open} enterTouchDelay={0} leaveTouchDelay={0} placement="top" title={date}>
      {children}
    </Tooltip>
  );
};

export default ValueLabelComponent;
