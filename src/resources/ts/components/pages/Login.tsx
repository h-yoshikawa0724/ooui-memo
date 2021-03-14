import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core';
import Header from '../../containers/organisms/Header';

type Props = {
  theme: Theme;
  email: string;
  password: string;
  handleChangeEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
};

const Login: FC<Props> = ({
  theme,
  email,
  password,
  handleChangeEmail,
  handleChangePassword,
  handleLogin,
}) => (
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

export default Login;
