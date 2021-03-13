import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import useTheme from '@material-ui/core/styles/useTheme';
import Header from '../organisms/Header';

type FormData = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const history = useHistory();
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

  const mutataion = useMutation(
    (formData: FormData) => axios.post('/api/login', formData),
    {
      onSuccess: (result) => {
        queryClient.setQueryData('user', () => result.data);
      },
    }
  );

  const handleLogin = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!email || !password) {
        return;
      }
      mutataion.mutate({ email, password });

      history.push('/');
    },
    [mutataion, history, email, password]
  );

  return (
    <>
      <CssBaseline />
      <Header logined={false} />
      <Container maxWidth="xs">
        <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
          <CardHeader title="login" style={{ textAlign: 'center' }} />
          <CardContent>
            <form onSubmit={handleLogin}>
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <TextField
                  label="メールアドレス"
                  variant="outlined"
                  fullWidth
                  value={email}
                  margin="normal"
                  onChange={handleChangeEmail}
                />
                <TextField
                  type="password"
                  label="パスワード"
                  variant="outlined"
                  fullWidth
                  value={password}
                  margin="normal"
                  onChange={handleChangePassword}
                />
                <Box my={2}>
                  <Button type="submit" color="primary" variant="contained">
                    ログイン
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
