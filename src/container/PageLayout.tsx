import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Header } from '@/container';

const PageRootContainer = styled.div(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'auto',
    minWidth: 320,
  };
});

const PageMain = styled.main(() => {
  return {
    display: 'flex',
    flex: 1,
    width: '100%',
  };
});

interface PageLayoutProps {
  children: ReactElement;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <PageRootContainer>
      <Header />
      <PageMain>{children}</PageMain>
    </PageRootContainer>
  );
};
