import '@emotion/react';

import { breakpointsOptions } from './options';
declare module '@emotion/react' {
  export interface Theme {
    breakpoints: typeof breakpointsOptions;
  }
}
