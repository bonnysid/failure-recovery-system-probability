import { FC, useEffect, useMemo, useState } from 'react';
import * as ST from './styled';
import { Button, ButtonVariant, Icon, Input } from '@src/components';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { CountStep } from '@pages/Main/components/Settings/SettingsModal/CountStep';
import { FailureRatesStep } from '@pages/Main/components/Settings/SettingsModal/FailureRatesStep';
import { RecoveryRatesStep } from '@pages/Main/components/Settings/SettingsModal/RecoveryRatesStep';

type Props = {
  isOpen: boolean;
  close: () => void;
  onSave: (values: SettingsForm) => void;
}

export type SettingsForm = {
  count: number;
  recoveryRates: number[];
  failureRates: number[];
}

let VALIDATION_SCHEMA = yup.object().shape({
  count: yup.number().required('Обязательное поле'),
});

export const SettingsModal: FC<Props> = ({ close, isOpen, onSave }) => {
  const [step, setStep] = useState(1);
  const form = useFormik<SettingsForm>({
    initialValues: {
      recoveryRates: [],
      failureRates: [],
      count: 0,
    },
    validationSchema: VALIDATION_SCHEMA,

    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (e) {
        console.log(e);
      }
    },
  });

  const renderedStep = useMemo(() => {
    switch (step) {
      case 1:
        return <CountStep />;
      case 2:
        return <FailureRatesStep />;
      case 3:
        return <RecoveryRatesStep />;
      default:
        return <></>;
    }
  }, [step, form]);

  const next = () => {
    setStep(prev => prev < 3 ? prev + 1 : prev);
  }

  useEffect(() => {
    form.setFieldValue('recoveryRates', Array(Number(form.values.count)).fill(0));
    form.setFieldValue('failureRates', Array(Number(form.values.count)).fill(0));
  }, [form.values.count]);

  const handleSave = () => {
    onSave({
      count: Number(form.values.count),
      recoveryRates: form.values.recoveryRates.map(Number),
      failureRates: form.values.failureRates.map(Number),
    })
  }

  return (
    <ST.StyledModal open={isOpen} onClose={close} closeOnDocumentClick={false}>
      <FormikProvider value={form}>
        <ST.ModalHeader>
          <ST.ModalHeaderTop>
            <ST.Title>
              Настройки
            </ST.Title>
            <ST.StepInfo>
              {step} шаг из 3
            </ST.StepInfo>
          </ST.ModalHeaderTop>
          <Button variant={ButtonVariant.DANGER} onClick={close}>
            <Icon type="close"/>
          </Button>
        </ST.ModalHeader>
        <ST.ModalContent>
          {renderedStep}
        </ST.ModalContent>
        <ST.ModalFooter>
          <Button text={step === 3 ? 'Сохранить' : 'Далее'} onClick={step === 3 ? handleSave : next} />
        </ST.ModalFooter>
      </FormikProvider>
    </ST.StyledModal>
  )
}
