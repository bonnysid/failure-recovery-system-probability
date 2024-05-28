import { FC } from 'react';
import * as ST from './styled';
import { Button } from '@src/components';
import { useModalControls } from '@src/hooks';
import { SettingsModal } from '@pages/Main/components/Settings/SettingsModal';
import { ChartDataRequestData } from '@src/api/ChartAPI';

type Props = {
  currentSettings: ChartDataRequestData;
  onSave: (values: ChartDataRequestData) => void;
}

const Settings: FC<Props> = ({ onSave, currentSettings }) => {
  const { open, isOpen, close } = useModalControls();

  const handleSave = (value: ChartDataRequestData) => {
    onSave(value);
    close();
  }

  return (
    <ST.Wrapper>
      <Button text="Настройки" onClick={open} />
      <ST.CurrentSettingsWrapper>
        <ST.CurrentSettingsItem> λ1 = {currentSettings.l1} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> λ2 = {currentSettings.l2} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> λ3 = {currentSettings.l3} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> λ4 = {currentSettings.l4} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> λ5 = {currentSettings.l5} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> μ1 = {currentSettings.u1} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> μ2 = {currentSettings.u2} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> μ3 = {currentSettings.u3} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> μ4 = {currentSettings.u4} </ST.CurrentSettingsItem>
        <ST.CurrentSettingsItem> μ5 = {currentSettings.u5} </ST.CurrentSettingsItem>
      </ST.CurrentSettingsWrapper>
      {isOpen && (
        <SettingsModal close={close} isOpen={isOpen} onSave={handleSave} currentSettings={currentSettings} />
      )}
    </ST.Wrapper>
  );
}

export { Settings };

