import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { COLORS } from '@src/utils/colors';

export const TooltipContent = styled.div`
  display: inline-block;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 16px;
  max-width: 300px;

  &.dark {
    background-color: ${COLORS.darkGray130};
    color: ${COLORS.lightGray10}!important;
  }

  &.light {
    background-color: ${COLORS.white};
    color: ${COLORS.darkGray110}!important;
  }
`;

export const Tooltip = styled(Popup)`
  display: inline-block;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 16px;
  max-width: 300px;

  &.dark {
    background-color: ${COLORS.darkGray130};
    color: ${COLORS.lightGray10}!important;
  }

  &.light {
    background-color: ${COLORS.white};
    color: ${COLORS.darkGray110}!important;
  }
`;

export const TooltipText = styled.p`
  margin: 0;
`;
