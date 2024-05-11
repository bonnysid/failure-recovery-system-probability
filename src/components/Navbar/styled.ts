import styled, { css } from 'styled-components';
import { COLORS } from '@src/utils/colors';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 5px;
  justify-content: space-between;
  height: 100%;
  width: 265px;
  padding: 16px;
  background: ${COLORS.white};
  box-shadow: 0 7px 15px rgba(0,0,0,.05);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 5px;
  height: 100%;
`;

export const ProfileButton = styled.div`
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color .3s;
  border-radius: 8px;

  &:hover {
    background-color: ${COLORS.lightGray20};
  }
`;

export const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ProfileText = styled.div``;
export const ProfileTextEmail = styled.div`
  color: ${COLORS.gray90};
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 5px;
  width: 100%;
`;

export const LinkItem = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  grid-column-gap: 12px;
  padding: 12px;
  border-radius: 8px;
  color: ${COLORS.darkGray140};
  cursor: pointer;
  overflow: hidden;
  transition: background-color .2s;
  font-size: 16px;
  width: 100%;
  
  &:hover {
    background-color: ${COLORS.blue20};
  }
  
  ${({ isActive }) => isActive && css`
    background-color: ${COLORS.blue30};
    color: ${COLORS.darkGray140};
    font-weight: 500;
    font-size: 16px;
    
    path {
      fill: ${COLORS.blue70};
    }
  `}
`;
