import styled from 'styled-components';
import { COLORS } from '@src/utils/colors';
import { Modal } from '@src/components';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  background: ${COLORS.white};
  box-shadow: 0 1px 0 rgba(0, 0, 0, .05);
`;


export const StyledModal = styled(Modal)`
  min-width: 800px;
  min-height: 800px;
  max-height: 800px;
  padding: 0;
  display: flex;
  flex-direction: column;
`

export const StepInfo = styled.div`
  color: ${COLORS.gray90};
`;

export const ModalHeader = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${COLORS.lightGray30};
  padding: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-top: 1px solid ${COLORS.lightGray30};
  padding: 20px;
  margin-top: auto;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 16px;
  padding: 20px;
`;

export const ModalHeaderTop = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

export const Title = styled.div`
  display: flex;
  font-size: 24px;
  line-height: 24px;
`;

