// import React, { ElementType, forwardRef, memo } from 'react';
// import styled, { CSSObject } from '@emotion/styled';
// import { Theme } from '@emotion/react';
// import { ReactNode } from 'react';

// import { breakpointsProvider } from '@/lib/theme/provider';

// const { values: breakpointsValues } = breakpointsProvider;

// interface CSSWithBreakpoints {}

// interface BoxStyledProps {
//   component?: ElementType;
//   jcss?: CSSObject | any;
// }

// interface BoxProps extends BoxStyledProps {
//   children?: ReactNode;
// }

// type BreakpointsValuesType = typeof breakpointsValues;

// const breakpointsResponsive = (jcss: any, breakpointsMedia: any) => {
//   const converted = Object.entries(jcss).map(([className, value]) => {
//     return [className, value];
//   });
//   return Object.fromEntries(converted);
// };

// const BoxStyled = styled.div<BoxStyledProps>(({ theme, jcss }) => {
//   console.log(
//     'converted:',
//     breakpointsResponsive(jcss, theme.breakpoints.media),
//   );
//   return { ...jcss };
// });

// export const Box = memo(
//   forwardRef<HTMLDivElement, BoxProps>(function (
//     { children, component, jcss, ...props },
//     rootRef,
//   ) {
//     return (
//       <BoxStyled as={component} jcss={jcss} ref={rootRef} {...props}>
//         {children}
//       </BoxStyled>
//     );
//   }),
// );
export {};
