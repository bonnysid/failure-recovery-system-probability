import { FC, useState } from 'react';
import * as ST from './styled';
import { Button, Icon, Input, Modal } from '@src/components';
import { useModalControls } from '@src/hooks';
import { SettingsForm, SettingsModal } from '@pages/Main/components/Settings/SettingsModal';

type Props = {
  currentSettings: SettingsForm;
  onSave: (values: SettingsForm) => void;
}

const Settings: FC<Props> = ({ onSave, currentSettings }) => {
  const { open, isOpen, close } = useModalControls();

  const handleSave = (value: SettingsForm) => {
    onSave(value);
    close();
  }

  return (
    <ST.Wrapper>
      <Button text="Настройки" onClick={open} />
      <ST.CurrentSettingsWrapper>
        <ST.CurrentSettingsItem>
          Count = {currentSettings.count}
        </ST.CurrentSettingsItem>
        {currentSettings.failureRates.map((it, i) => (
          <ST.CurrentSettingsItem> l{i + 1} = {it} </ST.CurrentSettingsItem>
        ))}
        {currentSettings.recoveryRates.map((it, i) => (
          <ST.CurrentSettingsItem> u{i + 1} = {it} </ST.CurrentSettingsItem>
        ))}
      </ST.CurrentSettingsWrapper>
      {isOpen && (
        <SettingsModal close={close} isOpen={isOpen} onSave={handleSave} />
      )}
    </ST.Wrapper>
  );
}

export { Settings };

