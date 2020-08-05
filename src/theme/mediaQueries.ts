const breakpoints = {
  xxs: 390,
  xs: 450,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};
export const mq = Object.fromEntries(
  Object.entries(breakpoints).map((item) => [item[0], `@media (min-width: ${item[1]}px)`]),
);
