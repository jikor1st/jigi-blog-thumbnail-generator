import { ReactNode, useEffect } from 'react';
import { useConditionEffect } from '@/lib/hooks';
import styled from '@emotion/styled';

// import { Typo, Box } from '@/base-components';

export function BreakpointsPage() {
  useConditionEffect(() => {}, [], {
    componentDidUpdateCondition: false,
  });
  return (
    <>
      <p>test</p>
    </>
  );
}
