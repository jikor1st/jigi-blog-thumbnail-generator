import '@emotion/react';

import {
  typographyProvider,
  breakpointsProvider,
  paletteProvider,
} from './provider';
declare module '@emotion/react' {
  export interface Theme {
    breakpoints: typeof breakpointsProvider;
    typography: typeof typographyProvider;
    palette: typeof paletteProvider;
  }
}
