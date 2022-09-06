import React from 'react';

import { namedLazy } from '@/lib/modules';

const {
  MainPage,
  SuccessPage,
  PageNotFoundPage,
  // playground
  BreakpointsPage,
} = namedLazy(() => import('@/pages'), 300);

interface PageRouteType {
  name: string;
  path: string;
  page: React.ElementType;
}

export const PAGE_ROUTES: PageRouteType[] = [
  {
    name: '홈',
    path: '',
    page: MainPage,
  },
  {
    name: '성공',
    path: 'success',
    page: SuccessPage,
  },
  {
    name: 'playground/breakpoints',
    path: 'playground/breakpoints',
    page: BreakpointsPage,
  },
  {
    name: '404',
    path: '*',
    page: PageNotFoundPage,
  },
];
