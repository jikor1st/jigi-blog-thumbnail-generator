import styled from '@emotion/styled';

import LogoSymbol from '@/assets/images/logo-symbol.svg';

const HeaderContainer = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 30px',
    zIndex: 10000,
    height: 64,
    [theme.breakpoints.down('lg')]: {
      height: 52,
    },
  };
});

const HeaderLogo = styled.img(({ theme }) => {
  return {
    width: 32,
    height: 32,
    [theme.breakpoints.down('lg')]: {
      width: 24,
      height: 24,
    },
  };
});

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo src={LogoSymbol} alt="logo image | 로고 이미지" />
    </HeaderContainer>
  );
};
