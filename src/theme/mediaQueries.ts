import { objectMap } from '../utils/objectMap';

const breakpoints = {
  xxs: 390,
  xs: 450,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const mq = objectMap(breakpoints, (value) => `@media (min-width: ${value}px)`);
