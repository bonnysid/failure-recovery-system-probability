import styled, { css } from 'styled-components';
import { COLORS } from '@src/utils/colors';
import { InputSize } from '@src/components';

export const Wrapper = styled.label`
  display: block;
  width: 100%;
  
  &:disabled {
    opacity: 0.4;
  }
`;

export const Input = styled.input`
  display: block;
  box-shadow: none;
  outline: none;
  border: none;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  font-family: inherit;
  font-style: inherit;
  text-align: inherit;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
`;

interface IContainerProps {
  isError?: boolean;
  loading?: boolean;
  isInFocus?: boolean;
  size: InputSize;
}

const getInputBySize = ({ size }: IContainerProps) => {
  switch (size) {
    case InputSize.MD:
      return css`
        padding: 9px;
      `;
    case InputSize.XS:
      return css`
        padding: 4px 8px;
      `
  }
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  width: 100%;

  border: 1px solid ${COLORS.lightGray40};
  background-color: ${COLORS.white};
  border-radius: 6px;
  transition: border 0.2s;
  ${getInputBySize};
  
  &:hover {
    border-color: ${COLORS.gray60};
  }
  
  ${({ isError }) => isError ? css`
    border-color: ${COLORS.red60};
  ` : ''}
  ${({ isInFocus }) => isInFocus ? css`
    border-color: ${COLORS.gray100};
  ` : ''}

  &:not(:last-child) {
    margin-bottom: 4px;
  }
  &:not(:first-child) {
    margin-top: 4px;
  }
`;

export const Error = styled.div`
  font-size: 12px;
  color: ${COLORS.red70};
  &:not(:last-child) {
    padding-bottom: 0.5rem;
  }
`;

export const Caption = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.darkGray140};
  gap: 4px;
  font-size: 14px;
`;
