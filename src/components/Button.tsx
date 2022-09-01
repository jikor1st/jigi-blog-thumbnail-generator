import styled from '@emotion/styled';
import { memo, forwardRef, ReactNode, MouseEventHandler } from 'react';

import { paletteProvider } from '@/lib/theme/provider';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'error' | 'success';
  fullWidth?: boolean;
  onClick?: MouseEventHandler;
}
interface ButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

const ButtonBase = styled.button<ButtonBaseProps>(
  ({ theme, variant = 'primary', fullWidth = false }) => {
    const palette = theme.palette;
    return {
      maxWidth: fullWidth ? 'unset' : 300,
      width: '100%',
      height: 56,
      borderRadius: 28,
      cursor: 'pointer',
      border: 0,
      ...theme.typography.subtitle2,
      background: palette[variant].main,
      color: palette[variant].contrast,
      textAlign: 'center',
      transition: 'all 0.12s ease',
      '&:hover': {
        background: palette[variant].dark,
        color: palette[variant].light,
      },
    };
  },
);

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...props }, rootRef) => {
      return (
        <ButtonBase {...props} ref={rootRef}>
          {children}
        </ButtonBase>
      );
    },
  ),
);
