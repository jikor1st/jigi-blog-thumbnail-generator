import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import LoadingImage from '@/assets/images/logo-symbol.svg';

const Container = styled.div(() => {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    // bottom: 0,
    // right: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };
});

const LoadingWrapper = styled.div(() => {
  return {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 12,
  };
});

const rotateAnimation = keyframes`
  from {
    transform:rotate(0)
  }

  to {
    transform:rotate(360deg)
  }
`;

const LogoImage = styled.img(() => {
  return {
    width: 96,
    height: 96,
    animation: `${rotateAnimation} 3s ease-in-out infinite`,
  };
});

const SkeletonContainer = styled.div(() => {
  return {
    display: 'flex',
    height: 96,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '4px 0',
    boxSizing: 'border-box',
  };
});
const Skeleton = styled.div<{ width?: number; mb?: number }>(
  ({ theme, width = 48, mb = 0 }) => {
    return {
      width: width,
      height: 12,
      background: theme.palette.secondary.light,
      borderRadius: 12,
      marginBottom: mb,
    };
  },
);

export const PageLoading = () => {
  return (
    <Container>
      <LoadingWrapper>
        <LogoImage src={LoadingImage} alt="loading image | 로딩 이미지" />
        <SkeletonContainer>
          <Skeleton width={34} mb={16} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </SkeletonContainer>
      </LoadingWrapper>
    </Container>
  );
};
