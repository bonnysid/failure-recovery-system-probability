import { FC, useMemo, useState } from 'react';
import * as ST from './styled';
import { Button, ButtonVariant, Icon, Input } from '@src/components';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { ChartDataRequestData } from '@src/api/ChartAPI';

type Props = {
  isOpen: boolean;
  close: () => void;
  currentSettings: ChartDataRequestData;
  onSave: (values: ChartDataRequestData) => void;
}

let VALIDATION_SCHEMA = yup.object().shape({
  count: yup.number().required('Обязательное поле'),
});

export const SettingsModal: FC<Props> = ({ close, isOpen, onSave, currentSettings }) => {
  const form = useFormik<ChartDataRequestData>({
    initialValues: currentSettings,
    validationSchema: VALIDATION_SCHEMA,

    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSave = () => {
    onSave({
      u1: Number(form.values.u1),
      u2: Number(form.values.u2),
      u3: Number(form.values.u3),
      u4: Number(form.values.u4),
      u5: Number(form.values.u5),
      l1: Number(form.values.l1),
      l2: Number(form.values.l2),
      l3: Number(form.values.l3),
      l4: Number(form.values.l4),
      l5: Number(form.values.l5),
    });
  }

  return (
    <ST.StyledModal open={isOpen} onClose={close} closeOnDocumentClick={false}>
      <FormikProvider value={form}>
        <ST.ModalHeader>
          <ST.ModalHeaderTop>
            <ST.Title>
              Настройки
            </ST.Title>
          </ST.ModalHeaderTop>
          <Button variant={ButtonVariant.DANGER} onClick={close}>
            <Icon type="close"/>
          </Button>
        </ST.ModalHeader>
        <ST.ModalContent>
          <Input
            name={`l1`}
            value={form.values.l1}
            onChange={form.handleChange}
            caption={`Интенсивность отказа 1 (λ1)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`l2`}
            value={form.values.l2}
            onChange={form.handleChange}
            caption={`Интенсивность отказа 2 (λ2)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`l3`}
            value={form.values.l3}
            onChange={form.handleChange}
            caption={`Интенсивность отказа 3 (λ3)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`l4`}
            value={form.values.l4}
            onChange={form.handleChange}
            caption={`Интенсивность отказа 1 (λ4)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`l5`}
            value={form.values.l5}
            onChange={form.handleChange}
            caption={`Интенсивность отказа 1 (λ5)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`u1`}
            value={form.values.u1}
            onChange={form.handleChange}
            caption={`Интенсивность восстановления 1 (μ1)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`u2`}
            value={form.values.u2}
            onChange={form.handleChange}
            caption={`Интенсивность восстановления 2 (μ2)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`u3`}
            value={form.values.u3}
            onChange={form.handleChange}
            caption={`Интенсивность восстановления 1 (μ3)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`u4`}
            value={form.values.u4}
            onChange={form.handleChange}
            caption={`Интенсивность восстановления 1 (μ4)`}
            placeholder={`Введите интенсивность отказа`}
          />
          <Input
            name={`u5`}
            value={form.values.u5}
            onChange={form.handleChange}
            caption={`Интенсивность восстановления 1 (μ5)`}
            placeholder={`Введите интенсивность отказа`}
          />
        </ST.ModalContent>
        <ST.ModalFooter>
          <Button text={'Сохранить'} onClick={handleSave} />
        </ST.ModalFooter>
      </FormikProvider>
    </ST.StyledModal>
  )
}
