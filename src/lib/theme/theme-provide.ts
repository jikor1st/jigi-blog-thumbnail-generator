import { Theme } from '@emotion/react';

import {
  typographyProvider,
  breakpointsProvider,
  paletteProvider,
} from './provider';

const globalTheme: Theme = {
  breakpoints: breakpointsProvider,
  typography: typographyProvider,
  palette: paletteProvider,
};

export { globalTheme };
