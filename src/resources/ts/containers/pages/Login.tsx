import React, { FC, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import useTheme from '@material-ui/core/styles/useTheme';
import Login from '../../components/pages/Login';

type FormData = {
  email: string;
  password: string;
};

type LocationState = {
  from: string;
};

const EnhancedLogin: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = (location.state as LocationState) || {
    from: { pathname: '/' },
  };
  const theme = useTheme();
  const queryClient = useQueryClient();

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

  const mutation = useMutation(
    (formData: FormData) => axios.post('/api/login', formData),
    {
      onSuccess: (result) => {
        queryClient.setQueryData('user', () => result.data);
      },
    }
  );

  const handleLogin = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!email || !password) {
        return;
      }
      mutation.mutate({ email, password });

      history.replace(from);
    },
    [mutation, history, from, email, password]
  );

  return (
    <Login
      theme={theme}
      email={email}
      password={password}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleLogin={handleLogin}
    />
  );
};

export default EnhancedLogin;
