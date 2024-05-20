import styled from 'styled-components';
import { COLORS } from '@src/utils/colors';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  align-items: center;
  background: ${COLORS.white};
  box-shadow: 0 1px 0 rgba(0, 0, 0, .05);
`;

export const CurrentSettingsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const CurrentSettingsItem = styled.div`
  padding: 4px 8px;
  background: ${COLORS.lightGray30};
  border-radius: 4px;
  align-items: center;
  height: fit-content;
`;
