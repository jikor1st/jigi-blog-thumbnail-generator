import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import {
  ChangeEventHandler,
  memo,
  forwardRef,
  useRef,
  ChangeEvent,
} from 'react';

/** InputBase Component */
interface InputBaseProps {
  error?: boolean;
  type?: string;
  multiLine?: boolean;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
}

const InputBaseContainer = styled.div(({ theme }) => {
  return {
    width: '100%',
  };
});

const InputCommonStyles = (theme: Theme, error?: boolean) => {
  const mainColor = !error
    ? theme.palette.text.primary
    : theme.palette.error.main;
  const borderColor = !error
    ? theme.palette.divider.primary
    : theme.palette.error.main;
  const actionColor = !error
    ? theme.palette.primary.main
    : theme.palette.error.main;
  return {
    width: '100%',
    height: theme.typography.subtitle1.lineHeight,
    background: 'transparent',
    color: mainColor,
    padding: '10px 0',
    border: 0,
    borderBottom: `2px solid ${borderColor}`,
    ...theme.typography.subtitle1,
    transition: 'all 0.13s ease-in-out',
    '&::placeholder': {
      color: theme.palette.text.light,
    },
    '&:hover': {
      borderColor: actionColor,
    },
    '&:focus': {
      outline: 0,
      borderColor: actionColor,
    },
    '&:disabled': {
      background: theme.palette.actions.hover,
      borderColor: theme.palette.actions.disabled,
      paddingLeft: '10px',
      '&::placeholder': {
        color: theme.palette.actions.disabled,
      },
    },
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.subtitle2,
      padding: '6px 0',
      '&:disabled': {
        paddingLeft: '6px',
      },
    },
  };
};

const Input = styled.input<{ error?: boolean }>(({ theme, error }) => {
  return {
    ...InputCommonStyles(theme, error),
  };
});
const TextArea = styled.textarea<{ error?: boolean }>(({ theme, error }) => {
  return {
    resize: 'unset',
    maxHeight: `calc(${theme.typography.subtitle1.lineHeight} * 3)`,
    overflow: 'auto',
    ...InputCommonStyles(theme, error),
    // not standard
    ...theme.palette.unstabled_scrollbar,
  };
});

const HelperText = styled.p<{ error?: boolean }>(({ theme, error }) => {
  return {
    ...theme.typography.body2,
    color: !error ? theme.palette.secondary.main : theme.palette.error.main,
    marginTop: 4,
  };
});

interface AuthResizeTextAreaProps extends InputBaseProps {
  // children?: string | number;
}

const AutoResizeTextArea = memo(
  forwardRef<HTMLTextAreaElement, AuthResizeTextAreaProps>(
    ({ onChange, value, ...props }, textAreaRef) => {
      // const textAreaRef = useRef<HTMLTextAreaElement>(null);

      // TODO : auto resize 적용
      // const autoResizeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
      // const target = event.currentTarget;
      // if (target) {
      //   let height = target.scrollHeight; // 높이
      //   target.style.height = `${height + 8}px`;
      // }
      // };

      return (
        <TextArea
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            typeof onChange === 'function' && onChange(event);
            // autoResizeTextarea(event);
          }}
          ref={textAreaRef}
          {...props}
          value={value}
        />
      );
    },
  ),
);

export const InputBase = memo(
  forwardRef<HTMLInputElement & HTMLTextAreaElement, InputBaseProps>(
    (
      {
        error = false,
        type = 'text',
        placeholder,
        value,
        onChange,
        multiLine = false,
        disabled = false,
      },
      inputRef,
    ) => {
      return (
        <InputBaseContainer>
          {!multiLine ? (
            <Input
              error={error}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              ref={inputRef}
            />
          ) : (
            <AutoResizeTextArea
              error={error}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              ref={inputRef}
              value={value}
            />
          )}
        </InputBaseContainer>
      );
    },
  ),
);

/** TextFiled Component */
interface TextFieldProps extends InputBaseProps {
  inputTitle?: string;
  helperText?: string;
}

const TextFieldContainer = styled.div(({ theme }) => {
  return {};
});
const TextFieldHeader = styled.div(() => {
  return {};
});
const TextFiledTitle = styled.h3<{ disabled?: boolean }>(
  ({ theme, disabled }) => {
    return {
      color: !disabled
        ? theme.palette.text.secondary
        : theme.palette.actions.disabled,
      ...theme.typography.subtitle2,
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.body1,
      },
    };
  },
);

export const TextField = memo(
  forwardRef<HTMLInputElement & HTMLTextAreaElement, TextFieldProps>(
    (
      {
        inputTitle,
        helperText,
        error = false,
        disabled = false,
        ...inputProps
      },
      inputRef,
    ) => {
      return (
        <TextFieldContainer>
          <TextFieldHeader>
            {inputTitle && (
              <TextFiledTitle disabled={disabled}>{inputTitle}</TextFiledTitle>
            )}
          </TextFieldHeader>
          <InputBase
            error={error}
            {...inputProps}
            disabled={disabled}
            ref={inputRef}
          />
          {helperText && <HelperText error={error}>{helperText}</HelperText>}
        </TextFieldContainer>
      );
    },
  ),
);
