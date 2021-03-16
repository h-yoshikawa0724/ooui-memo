import React, { FC } from 'react';
import Login from '../../components/pages/Login';
import useAuth from '../../hooks/useAuth';

const EnhancedLogin: FC = () => {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
  } = useAuth();

  return (
    <Login
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleLogin={handleLogin}
    />
  );
};

export default EnhancedLogin;
