import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  ChangeEventHandler,
  memo,
  forwardRef,
  useRef,
  ChangeEvent,
} from 'react';

/** InputBase Component */
interface InputBaseProps {
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
const Input = styled.input(({ theme }) => {
  return {
    boxSizing: 'border-box',
    background: 'transparent',
    width: '100%',
    height: 54,
    padding: '12px 0',
    color: theme.palette.text.primary,
    border: 0,
    ...theme.typography.subtitle1,
    transition: 'all 0.27s ease-in-out',
    '&::placeholder': {
      color: theme.palette.text.light,
    },
    borderBottom: `2px solid ${theme.palette.divider.primary}`,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      outline: 0,
      borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
      background: theme.palette.actions.hover,
      borderColor: theme.palette.actions.disabled,
      paddingLeft: '12px',
      '&::placeholder': {
        color: theme.palette.actions.disabled,
      },
    },
  };
});
const TextArea = styled.textarea(({ theme }) => {
  return {
    resize: 'unset',
    // boxSizing: 'border-box',
    background: 'transparent',
    width: '100%',
    height: theme.typography.subtitle1.lineHeight,
    maxHeight: `calc(${theme.typography.subtitle1.lineHeight} * 3)`,
    overflow: 'auto',
    padding: '12px 0',
    color: theme.palette.text.primary,
    border: 0,
    ...theme.typography.subtitle1,
    transition: 'all 0.27s ease-in-out',
    '&::placeholder': {
      color: theme.palette.text.light,
    },
    borderBottom: `2px solid ${theme.palette.divider.primary}`,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      outline: 0,
      borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
      background: theme.palette.actions.hover,
      borderColor: theme.palette.actions.disabled,
      paddingLeft: '12px',
      '&::placeholder': {
        color: theme.palette.actions.disabled,
      },
    },
    // not standard
    ...theme.palette.unstabled_scrollbar,
  };
});

interface AuthResizeTextAreaProps extends InputBaseProps {
  // children?: string | number;
}

const AutoResizeTextArea: React.FC<AuthResizeTextAreaProps> = ({
  onChange,
  value,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // TODO : auto resize 적용
  const autoResizeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // const target = event.currentTarget;
    // if (target) {
    //   let height = target.scrollHeight; // 높이
    //   target.style.height = `${height + 8}px`;
    // }
  };

  return (
    <TextArea
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        typeof onChange === 'function' && onChange(event);
        autoResizeTextarea(event);
      }}
      ref={textAreaRef}
      {...props}
      value={value}
    />
  );
};

export const InputBase = memo(
  forwardRef<HTMLInputElement, InputBaseProps>(
    (
      {
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
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              ref={inputRef}
            />
          ) : (
            <AutoResizeTextArea
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              // ref={inputRef}
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
}

const TextFieldContainer = styled.div(({ theme }) => {
  return {};
});
const TextFieldHeader = styled.div(() => {
  return {
    marginBottom: '4px',
  };
});
const TextFiledTitle = styled.h3<{ disabled?: boolean }>(
  ({ theme, disabled }) => {
    return {
      color: !disabled
        ? theme.palette.text.secondary
        : theme.palette.actions.disabled,
      ...theme.typography.subtitle2,
    };
  },
);

export const TextField = memo(
  forwardRef<HTMLInputElement, TextFieldProps>(
    ({ inputTitle, disabled = false, ...inputProps }, inputRef) => {
      return (
        <TextFieldContainer>
          <TextFieldHeader>
            {inputTitle && (
              <TextFiledTitle disabled={disabled}>{inputTitle}</TextFiledTitle>
            )}
          </TextFieldHeader>
          <InputBase {...inputProps} disabled={disabled} ref={inputRef} />
        </TextFieldContainer>
      );
    },
  ),
);
