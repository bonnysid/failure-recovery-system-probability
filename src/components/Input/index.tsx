import { FC, useState } from 'react';

import * as ST from './styled';

export enum InputSize {
  XS = 'XS',
  MD = 'MD',
}

type OwnProps = {
  caption?: string;
  description?: string;
  descriptionOnTop?: boolean;
  errorText?: string;
  prefix?: string;
  suffix?: string;
  size?: InputSize;
  isError?: boolean;
  loading?: boolean;
  onClear?: () => void;
  tooltipClass?: string;
  tooltipTextClass?: string;
  controls?: JSX.Element;
  actionsLeft?: JSX.Element;
  actionsRight?: JSX.Element;
};

export type Props = Omit<React.ComponentPropsWithRef<'input'>, keyof OwnProps> & OwnProps;

export const Input: FC<Props> = ({
  caption,
  loading,
  size= InputSize.MD,
  descriptionOnTop,
  isError,
  onClear,
  prefix,
  suffix,
  ref,
  errorText,
  children,
  className,
  value,
  disabled,
  onFocus,
  onBlur,
  placeholder,
  actionsLeft,
  actionsRight,
  ...rest
}) => {
  const [isInFocus, setIsInFocus] = useState(false);

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsInFocus(true);
    onFocus && onFocus(event);
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsInFocus(false);
    onBlur && onBlur(event);
  };

  return (
    <ST.Wrapper className={className}>
      {caption && (
        <ST.Caption>
          {caption}
        </ST.Caption>
      )}
      <ST.Container isError={isError} loading={loading} isInFocus={isInFocus} size={size}>
        <ST.InputContainer>
          {actionsLeft}
          <ST.Input
            ref={ref}
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            {...rest}
          />
          {actionsRight}
          {loading && '...'}
        </ST.InputContainer>
      </ST.Container>
      {isError && errorText && <ST.Error>{errorText}</ST.Error>}
    </ST.Wrapper>
  );
}
