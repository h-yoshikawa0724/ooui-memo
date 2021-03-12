import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../organisms/Header';

const Login: FC = () => {
  const history = useHistory();
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
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!email || !password) {
        return;
      }

      await axios.post('/api/login', { email, password }).then((response) => {
        console.log(response);
        // stateにユーザ情報を保持する
      });

      history.push('/');
    },
    [history, email, password]
  );

  return (
    <>
      <Header logined={false} />
      <form onSubmit={handleLogin}>
        <label htmlFor="login-email">
          <input type="text" value={email} onChange={handleChangeEmail} />
        </label>
        <label htmlFor="login-password">
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <button type="submit">ログイン</button>
      </form>
    </>
  );
};

export default Login;
