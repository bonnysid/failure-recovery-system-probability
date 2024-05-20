import { FC } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { SettingsForm } from '@pages/Main/components/Settings/SettingsModal/index';
import { Input } from '@src/components';

export const FailureRatesStep: FC = () => {
  const form = useFormikContext<SettingsForm>();

  return (
    <FieldArray name="failureRates" render={helpers => {
      return form.values.failureRates.map((it, index) => (
        <Input
          key={index}
          name={`failureRates.${index}`}
          value={form.values.failureRates[index]}
          onChange={form.handleChange}
          caption={`Интенсивность отказа ${index + 1} (l${index + 1})`}
          placeholder={`Введите интенсивность отказа`}
        />
      ))
    }}/>
  );
}
