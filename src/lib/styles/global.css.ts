import { css } from '@emotion/react';

const globalCss = css`
  html,
  body {
    font-family: 'Pretendard';
  }

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }

  .fade-appear,
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }
  .fade-appear-active,
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms linear 100ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 150ms linear;
  }
`;

export { globalCss };
