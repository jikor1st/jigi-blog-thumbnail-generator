/**
xs : x-small
sm : small
md : medium
lg : large
xl : extra large
xxl : extra extra large
 */

export type BreakpointsValuesType = typeof breakpointsValues;
export type BreakpointsMediaKeysType = 'down' | 'up' | 'only' | 'not';

const PRECISION = 0.02;

const breakpointsValues = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const breakpointsMedia = {
  down(point: keyof BreakpointsValuesType) {
    const value = breakpointsValues[point];
    return `@media (max-width:${value - PRECISION}px)`;
  },
  up(value: number) {
    return `@media (min-width:${value}px)`;
  },
  only(sValue: number, eValue: number) {
    return `@media (min-width:${sValue}px) and (max-width:${
      eValue - PRECISION
    }px)`;
  },
  not(sValue: number, eValue: number) {
    return `@media not all and (min-width:${sValue}px) and (max-width:${
      eValue - PRECISION
    }px)`;
  },
};

export const breakpointsOptions = {
  values: breakpointsValues,
  media: breakpointsMedia,
};
