import styled from '@emotion/styled';

import { useNavigate, useLocation } from 'react-router-dom';
import { IconBase } from '@/components';

interface GoBackProps {
  linkTo?: string;
}

const GoBackButton = styled.button(() => {
  return {
    cursor: 'pointer',
    background: 'unset',
    outline: 0,
    border: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  };
});

const Icon = styled.div(() => {
  return {
    transform: 'rotate(90deg)',
    marginRight: 4,
  };
});

const GoBackText = styled.h2(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    ...theme.typography.subtitle2,
  };
});
export const GoBack: React.FC<GoBackProps> = ({ linkTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <GoBackButton
      onClick={() => {
        if (linkTo) {
          navigate(linkTo, { ...location });
        } else {
          navigate(-1);
        }
      }}
    >
      <Icon>
        <IconBase icon="ArrowDown" />
      </Icon>
      <GoBackText>뒤로가기</GoBackText>
    </GoBackButton>
  );
};
