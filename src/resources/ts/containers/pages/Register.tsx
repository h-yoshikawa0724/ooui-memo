import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Register from '../../components/pages/Register';
import { useRegister } from '../../hooks/auth';

type FormData = {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  legalChecked: boolean;
};

const EnhancedRegister: FC = () => {
  const history = useHistory();
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    legalChecked: false,
  });
  const { error, isLoading, mutate: register } = useRegister();
  const statusCode = error?.response?.status;

  const handleChange = useCallback(
    (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === 'legalChecked') {
        setValues({ ...values, [prop]: event.target.checked });
      } else {
        setValues({ ...values, [prop]: event.target.value });
      }
    },
    [values]
  );

  const handleClickShowPassword = useCallback(() => {
    setValues({ ...values, showPassword: !values.showPassword });
  }, [values]);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleRegister = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!values.name || !values.email || !values.password) {
        return;
      }
      register(
        { name: values.name, email: values.email, password: values.password },
        {
          onSuccess: () => {
            history.push('/mail/verify', { mailSend: true });
          },
        }
      );
    },
    [values.name, values.email, values.password, history, register]
  );

  return (
    <Register
      isLoading={isLoading}
      statusCode={statusCode}
      values={values}
      handleChange={handleChange}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleRegister={handleRegister}
    />
  );
};

export default EnhancedRegister;
