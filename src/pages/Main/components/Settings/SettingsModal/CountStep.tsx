import { FC } from 'react';
import { Input } from '@src/components';
import { useFormikContext } from 'formik';
import { SettingsForm } from '@pages/Main/components/Settings/SettingsModal/index';

export const CountStep: FC = () => {
  const form = useFormikContext<SettingsForm>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((/^[0-9]+$/g.test(e.target.value) || e.target.value === '') && e.target.value !== '0') {
      form.setFieldValue('count', e.target.value)
    }
  }

  return (
    <Input
      caption="Кол-во элементов"
      type="number"
      name="count"
      placeholder="Введите кол-во"
      onChange={handleChange}
      value={form.values.count}
      isError={Boolean(form.errors.count)}
      errorText={form.errors.count}
      onBlur={form.handleBlur}
    />
  )
}
