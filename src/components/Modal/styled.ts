import styled from 'styled-components';
import { COLORS } from '@src/utils/colors';

export const Wrapper = styled.div`
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.05);
  padding: 32px;
`;

export const Overlay = styled.div<{ hidden?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  height: 100%;
  width: 100%;
  background: ${({ hidden }) => hidden ? 'transparent' : 'rgba(26, 32, 36, 0.5)'};
  outline: none;
`;
