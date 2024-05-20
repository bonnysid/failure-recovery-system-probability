import { FC } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { SettingsForm } from '@pages/Main/components/Settings/SettingsModal/index';
import { Input } from '@src/components';

export const RecoveryRatesStep: FC = () => {
  const form = useFormikContext<SettingsForm>();

  return (
    <FieldArray name="recoveryRates" render={helpers => {
      return form.values.recoveryRates.map((it, index) => (
        <Input
          key={index}
          name={`recoveryRates.${index}`}
          value={form.values.recoveryRates[index]}
          onChange={form.handleChange}
          caption={`Интенсивность восстановления ${index + 1} (u${index + 1})`}
          placeholder={`Введите интенсивность восстановления`}
        />
      ))
    }}/>
  );
}
