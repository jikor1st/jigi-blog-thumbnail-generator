import styled from '@emotion/styled';

import { ButtonBase, IconBase } from '@/components';
import { useNavigate } from 'react-router-dom';
import { memo, MouseEventHandler, ReactNode } from 'react';

const Container = styled.section(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    padding: '0 40px',
  };
});

const Wrapper = styled.div(() => {
  return {
    textAlign: 'center',
    maxWidth: 460,
  };
});

const ErrorCode = styled.h2(({ theme }) => {
  return {
    color: theme.palette.error.main,
    ...theme.typography.h3,
  };
});

const ErrorMsgWrapper = styled.h3(({ theme }) => {
  return {
    display: 'inline-grid',
    gridAutoFlow: 'column',
    gridGap: 10,
    textAlign: 'left',
    marginTop: 8,
  };
});
const ErrorMsg = styled.span(({ theme }) => {
  return {
    display: 'block',
    marginTop: '-2px',
    ...theme.typography.h6,
  };
});

const ErrorText = styled.p(({ theme }) => {
  return {
    ...theme.typography.body1,
    marginTop: 30,
  };
});

const ButtonBox = styled.div(() => {
  return {
    marginTop: 50,
  };
});

interface ErrorViewProps {
  errorCode: number | string;
  errorMessage: string | ReactNode;
  errorText?: string | ReactNode;
  onResetError?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = memo(
  ({
    errorCode,
    errorMessage,
    errorText = '서비스 이용에 불편을 드려서 죄송합니다.',
    onResetError,
  }) => {
    const navigate = useNavigate();
    return (
      <Container>
        <Wrapper>
          <ErrorCode>{errorCode}</ErrorCode>
          <ErrorMsgWrapper>
            <IconBase icon="Warning" variant="filled" color="error" />
            <ErrorMsg>{errorMessage}</ErrorMsg>
          </ErrorMsgWrapper>
          <ErrorText>{errorText}</ErrorText>
          <ButtonBox>
            <ButtonBase
              size="medium"
              color="secondary"
              variant="outlined"
              onClick={() => {
                if (typeof onResetError === 'function') onResetError();
                navigate('/');
              }}
            >
              홈으로 돌아가기
            </ButtonBase>
          </ButtonBox>
        </Wrapper>
      </Container>
    );
  },
);
