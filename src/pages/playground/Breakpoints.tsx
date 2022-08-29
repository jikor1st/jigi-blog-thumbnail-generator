import { useEffect } from 'react';
import { breakpointsOptions } from '@/lib/theme/options/breakpoints';
import { useConditionEffect } from '@/lib/hooks';
import styled from '@emotion/styled';

export function BreakpointsPage() {
  useConditionEffect(() => {}, [], {
    componentDidUpdateCondition: false,
  });
  return (
    <>
      <p>test</p>
      <BoxStyled>box</BoxStyled>
    </>
  );
}

const BoxStyled = styled.div(({ theme }) => {
  console.log(theme);
  return {
    [theme.breakpoints.media.down('sm')]: {
      color: '#ff0000',
    },
  };
});
