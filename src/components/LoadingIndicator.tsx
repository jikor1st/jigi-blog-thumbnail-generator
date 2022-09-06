import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Loading = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${Spin} 1s ease-in-out infinite;
`;

export const LoadingIndicator = () => {
  return <Loading />;
};
