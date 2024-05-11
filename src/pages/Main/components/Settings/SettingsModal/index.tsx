import { FC } from 'react';
import * as ST from '@pages/Main/components/Settings/styled';
import { Button, Icon, Input } from '@src/components';

export const SettingsModal: FC = () => {
  return (
    <ST.StyledModal open={isOpen} onClose={close}>
    <ST.ModalHeader>
      <ST.ModalHeaderTop>
        <ST.Title>
          Настройки
    </ST.Title>
    <ST.StepInfo>
    {step} шаг из 3
  </ST.StepInfo>
  </ST.ModalHeaderTop>
  <Button onClick={close}>
  <Icon type="close"/>
  </Button>
  </ST.ModalHeader>
  <ST.ModalContent>
  <Input caption="Кол-во элементов" type="number" placeholder="Введите кол-во" />
  </ST.ModalContent>
  <ST.ModalFooter>
  <Button text={step === 3 ? 'Сохранить' : 'Далее'} onClick={next} />
  </ST.ModalFooter>
  </ST.StyledModal>
  )
}
