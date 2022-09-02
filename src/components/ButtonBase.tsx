import styled from '@emotion/styled';
import { memo, forwardRef, ReactNode, MouseEventHandler } from 'react';

import { typographyOptions } from '@/lib/theme/options';

type typefaceKey = typeof typographyOptions.typeface;

const BUTTON_FONT: { [index: string]: keyof typefaceKey } = {
  large: 'subtitle2',
  medium: 'body1',
  small: 'body2',
};

const BUTTON_PX = {
  large: 24,
  medium: 16,
  small: 12,
};

const BUTTON_HEIGHT = {
  large: 56,
  medium: 40,
  small: 32,
};

interface ButtonBaseProps {
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
  onClick?: MouseEventHandler;
}

const Button = styled.button<ButtonBaseProps>(
  ({
    theme,
    variant = 'filled',
    color = 'primary',
    size = 'large',
    fullWidth = false,
  }) => {
    const height = BUTTON_HEIGHT[size];
    const typography = theme.typography[BUTTON_FONT[size]];
    const px = BUTTON_PX[size];
    const stateStatic = {
      color: '',
      bgColor: 'none',
      borderColor: 'none',
    };
    const stateHover = {
      color: '',
      bgColor: 'none',
      borderColor: 'none',
    };

    switch (variant) {
      case 'text':
        // TODO
        break;
      case 'outlined':
        // static
        stateStatic.color = theme.palette[color].main;
        stateStatic.borderColor = theme.palette[color].main;

        // hover
        stateHover.color = theme.palette[color].dark;
        stateHover.bgColor = theme.palette[color].light;
        stateHover.borderColor = theme.palette[color].dark;
        break;
      default:
        /* filled */
        // static
        stateStatic.color = theme.palette[color].contrast;
        stateStatic.bgColor = theme.palette[color].main;

        // hover
        stateHover.color = theme.palette[color].light;
        stateHover.bgColor = theme.palette[color].dark;
        break;
    }

    return {
      cursor: 'pointer',
      width: !fullWidth ? 'auto' : '100%',
      height: height,
      padding: `0 ${px}px`,
      ...typography,
      color: stateStatic.color,
      background: stateStatic.bgColor,
      border: stateStatic.borderColor !== 'none' ? '1px solid' : 0,
      borderColor: stateStatic.borderColor,
      borderRadius: height / 2,
      textAlign: 'center',
      transition: 'all 0.12s ease',
      '&:hover': {
        color: stateHover.color,
        background: stateHover.bgColor,
        border: stateHover.borderColor !== 'none' ? '1px solid' : 0,
        borderColor: stateHover.borderColor,
      },
    };
  },
);

interface ButtonProps extends ButtonBaseProps {
  children?: ReactNode;
}

export const ButtonBase = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...props }, rootRef) => {
      return (
        <Button ref={rootRef} {...props}>
          {children}
        </Button>
      );
    },
  ),
);
