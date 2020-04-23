import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import getDate from '../../../../../../../utils/getDate';

const ValueLabelComponent = (props: any) => {
  const { children, open, value } = props;
  const [minutes, hours, day, dayName, month] = getDate(
    Date.now() - 1000 * 60 * 60 * 24 * 8 + value * ((1000 * 60 * 60) / 2),
  );
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      leaveTouchDelay={0}
      placement="top"
      title={`${hours}:${minutes} ${day}.${month} ${dayName}`}
    >
      {children}
    </Tooltip>
  );
};

export default ValueLabelComponent;
