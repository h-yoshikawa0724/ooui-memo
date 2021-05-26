import React, { FC } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Header from '../../containers/organisms/Header';
import Footer from '../organisms/Footer';
import LegalLink from '../molecules/LegalLink';
import RegisterAlert from '../molecules/RegisterAlert';

type FormData = {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  legalChecked: boolean;
};

type Props = {
  isLoading: boolean;
  statusCode?: number;
  values: FormData;
  handleChange: (
    prop: keyof FormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword: VoidFunction;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRegister: (ev: React.FormEvent<HTMLFormElement>) => void;
};

const Register: FC<Props> = ({
  isLoading,
  statusCode,
  values,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleRegister,
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <main style={{ flex: 1 }}>
        <Container maxWidth="xs">
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title="新規登録" style={{ textAlign: 'center' }} />
            <CardContent>
              <form onSubmit={handleRegister}>
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  {statusCode && <RegisterAlert statusCode={statusCode} />}
                  <TextField
                    label="名前"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    margin="normal"
                    required
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange('name')}
                  />
                  <TextField
                    label="メールアドレス"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    margin="normal"
                    required
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange('email')}
                  />
                  <TextField
                    type={values.showPassword ? 'text' : 'password'}
                    label="パスワード"
                    variant="outlined"
                    fullWidth
                    value={values.password}
                    margin="normal"
                    required
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChange('password')}
                  />
                  <Box my={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.legalChecked}
                          onChange={handleChange('legalChecked')}
                          name="legalChecked"
                          color="primary"
                        />
                      }
                      label={<LegalLink type="register" />}
                    />
                  </Box>
                  <Box my={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={!values.legalChecked}
                    >
                      新規登録
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

export default Register;
