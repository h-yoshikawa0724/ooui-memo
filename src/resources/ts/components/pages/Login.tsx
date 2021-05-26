import React, { FC } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import LoginAlert from '../molecules/LoginAlert';
import LegalLink from '../molecules/LegalLink';
import SocialLoginAlert from '../molecules/SocialLoginAlert';
import Footer from '../organisms/Footer';
import GitHubLoginButton from '../atoms/GitHubLoginButton';
import { Provider } from '../../models/OAuth';

const useStyles = makeStyles(() => ({
  decorationLine: {
    borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
    borderImageSlice: 1,
  },
}));

type Props = {
  email: string;
  password: string;
  handleChangeEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  statusCode?: number;
  socialLoginStatusCode?: number;
  isLoading: boolean;
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  handleSocialLoginRequest: (provider: Provider) => void;
};

const Login: FC<Props> = ({
  email,
  password,
  handleChangeEmail,
  handleChangePassword,
  statusCode,
  socialLoginStatusCode,
  isLoading,
  handleLogin,
  handleSocialLoginRequest,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <main style={{ flex: 1 }}>
        <Container maxWidth="xs">
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title="login" style={{ textAlign: 'center' }} />
            <CardContent>
              <Box p={2} borderBottom={1} className={classes.decorationLine}>
                {socialLoginStatusCode && (
                  <SocialLoginAlert statusCode={socialLoginStatusCode} />
                )}
                <Box mt={2}>
                  <GitHubLoginButton
                    handleSocialLoginRequest={handleSocialLoginRequest}
                  />
                </Box>
              </Box>
              <form onSubmit={handleLogin}>
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  {statusCode && <LoginAlert statusCode={statusCode} />}
                  <TextField
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                    value={email}
                    margin="normal"
                    required
                    autoComplete="email"
                    autoFocus
                    onChange={handleChangeEmail}
                  />
                  <TextField
                    type="password"
                    label="パスワード"
                    variant="outlined"
                    fullWidth
                    value={password}
                    margin="normal"
                    required
                    autoComplete="current-password"
                    onChange={handleChangePassword}
                  />
                  <Box my={2}>
                    <LegalLink type="login" />
                  </Box>
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
      </main>
      <Footer />
      <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Login;
