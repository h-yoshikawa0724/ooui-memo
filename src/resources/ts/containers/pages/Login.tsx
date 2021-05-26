import React, { FC, useState, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
import { useHistory, useLocation } from 'react-router-dom';
import Login from '../../components/pages/Login';
import { useLogin, useOAuthUrl } from '../../hooks/auth';
import { Provider } from '../../models/OAuth';

const EnhancedLogin: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = (location.state as { from: Location }) || {
    from: { pathname: '/' },
  };

  const { error, isLoading: loginIsLoading, mutate: login } = useLogin();
  const statusCode = error?.response?.status;
  const {
    error: socialLoginError,
    isLoading: socialLoginIsLoading,
    mutate: redirectOAuth,
  } = useOAuthUrl();
  const socialLoginStatusCode = socialLoginError?.response?.status;
  const isLoading = loginIsLoading || socialLoginIsLoading;

  const [email, setEmail] = useState('');
  const [password, serPassword] = useState('');

  const handleChangeEmail = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(ev.target.value);
    },
    []
  );

  const handleChangePassword = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      serPassword(ev.target.value);
    },
    []
  );

  const handleLogin = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!email || !password) {
        return;
      }
      login(
        { email, password },
        {
          onSuccess: () => {
            history.replace(from);
          },
        }
      );
    },
    [email, password, history, from, login]
  );

  const handleSocialLoginRequest = useCallback(
    (provider: Provider) => {
      redirectOAuth(provider);
    },
    [redirectOAuth]
  );

  return (
    <Login
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      statusCode={statusCode}
      socialLoginStatusCode={socialLoginStatusCode}
      isLoading={isLoading}
      handleLogin={handleLogin}
      handleSocialLoginRequest={handleSocialLoginRequest}
    />
  );
};

export default EnhancedLogin;
