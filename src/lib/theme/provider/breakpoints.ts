import { breakpointsOptions } from '../options';

const PRECISION = 0.02;
const { values: breakpointsValues } = breakpointsOptions;

type BreakpointsValuesType = typeof breakpointsValues;
type BreakpointsValuesKeyType = keyof BreakpointsValuesType;

const breakpointsMedia = {
  down(point: BreakpointsValuesKeyType) {
    const value = breakpointsValues[point];
    return `@media (max-width:${value - PRECISION}px)`;
  },
  up(point: BreakpointsValuesKeyType) {
    const value = breakpointsValues[point];
    return `@media (min-width:${value}px)`;
  },
  only(sPoint: BreakpointsValuesKeyType, ePoint: BreakpointsValuesKeyType) {
    const sValue = breakpointsValues[sPoint];
    const eValue = breakpointsValues[ePoint];
    return `@media (min-width:${sValue}px) and (max-width:${eValue}px)`;
  },
  not(sPoint: BreakpointsValuesKeyType, ePoint: BreakpointsValuesKeyType) {
    const sValue = breakpointsValues[sPoint];
    const eValue = breakpointsValues[ePoint];
    return `@media not all and (min-width:${sValue}px) and (max-width:${eValue}px)`;
  },
} as const;

export const breakpointsProvider = {
  values: breakpointsValues,
  ...breakpointsMedia,
};
