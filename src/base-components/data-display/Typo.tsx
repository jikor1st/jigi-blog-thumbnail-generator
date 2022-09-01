// import React, { ElementType, forwardRef, memo } from 'react';
// import styled from '@emotion/styled';
// import { Theme } from '@emotion/react';
// import { ReactNode } from 'react';

// import { typographyProvider } from '@/lib/theme/provider';

// const { ...typeface } = typographyProvider;

// interface TypoStyledProps {
//   component?: ElementType;
//   variant?: keyof typeof typeface;
// }

// interface TypoProps extends TypoStyledProps {
//   children?: ReactNode;
// }

// const breakpointsResponsive = () => {};

// const TypoStyled = styled.p<TypoStyledProps>(({ theme, variant }) => {
//   const fontSystem = variant && theme.typography[variant];
//   return {
//     fontFamily: theme.typography.fontFamily,
//     ...fontSystem,
//   };
// });

// export const Typo = memo(
//   forwardRef<HTMLParagraphElement, TypoProps>(function (
//     { children, component, ...props },
//     rootRef,
//   ) {
//     return (
//       <TypoStyled as={component} ref={rootRef} {...props}>
//         {children}
//       </TypoStyled>
//     );
//   }),
// );

export {};
