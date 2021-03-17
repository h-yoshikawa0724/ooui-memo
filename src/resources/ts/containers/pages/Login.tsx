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
    loginMutation,
  } = useAuth();
  const { error, isLoading } = loginMutation;
  const statusCode = error?.response?.status;

  return (
    <Login
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      statusCode={statusCode}
      isLoading={isLoading}
      handleLogin={handleLogin}
    />
  );
};

export default EnhancedLogin;
