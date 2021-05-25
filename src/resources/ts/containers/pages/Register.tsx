import React, { FC, useState, useCallback } from 'react';
import Register from '../../components/pages/Register';

type FormData = {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
};

const EnhancedRegister: FC = () => {
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = useCallback(
    (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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

  const handleRegister = useCallback((ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // TODO 新規登録処理
  }, []);

  return (
    <Register
      values={values}
      handleChange={handleChange}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleRegister={handleRegister}
    />
  );
};

export default EnhancedRegister;
