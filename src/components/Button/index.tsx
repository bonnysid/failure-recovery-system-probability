import { FC } from 'react';
import * as ST from './styled';
import { ClipLoader } from 'react-spinners';
import { COLORS } from '@src/utils/colors';

export enum ButtonVariant {
  OUTLINE = 'outline',
  FILLED = 'filled',
  DANGER = 'danger'
}

type OwnProps = {
  variant?: ButtonVariant;
  text?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
};

export type ButtonProps = Omit<React.ComponentPropsWithRef<'button'>, keyof OwnProps> & OwnProps;

export const Button: FC<ButtonProps> = ({ className, variant = ButtonVariant.FILLED, children, text, isLoading, disabled, ...rest }) => {
  return (
    <ST.Wrapper className={`${variant} ${className}`} {...rest} disabled={isLoading || disabled}>
      {isLoading ? (
        <ClipLoader size={13} color={COLORS.white} />
      ) : (text || children)}
    </ST.Wrapper>
  );
}
