import { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../models/User';

type FormData = {
  email: string;
  password: string;
};

const login = async (formData: FormData): Promise<User> => {
  const { data } = await axios.post('/api/login', formData);
  return data;
};

const useLoginMutation = (): UseMutationResult<
  User,
  AxiosError,
  FormData,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData('user', () => data);
    },
  });
};

const logout = async (): Promise<[]> => {
  const { data } = await axios.post('/api/logout');
  return data;
};

const useLogoutMutation = (): UseMutationResult<
  [],
  AxiosError,
  void,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.resetQueries('user');
    },
  });
};

const useAuth = (): {
  email: string;
  password: string;
  handleChangeEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: VoidFunction;
} => {
  const history = useHistory();
  const location = useLocation();
  const { from } = (location.state as { from: string }) || {
    from: { pathname: '/' },
  };

  const [email, setEmail] = useState('');
  const [password, serPassword] = useState('');
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

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
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: () => {
            history.replace(from);
          },
        }
      );
    },
    [email, password, history, from, loginMutation]
  );

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        history.push('/login');
      },
    });
    logoutMutation.mutate();
  }, [history, logoutMutation]);

  return {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
