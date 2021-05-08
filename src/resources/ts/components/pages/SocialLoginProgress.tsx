import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import GeneralAlert from '../atoms/GeneralAlert';

type Props = {
  oAuthError: boolean;
  statusCode?: number;
};

const Content: FC<Props> = ({ oAuthError, statusCode }) => {
  if (oAuthError) {
    return (
      <>
        <GeneralAlert
          type="error"
          title="認可エラー"
          content={`ソーシャルサービス側の認可処理でエラーが発生しました。\n恐れ入りますが時間をおいて再度お試しください。`}
        />
        <Box py={2} textAlign="center">
          <Typography variant="caption">
            <Link to="/login">ログイン画面</Link>
            に戻る
          </Typography>
        </Box>
      </>
    );
  }

  if (statusCode) {
    return (
      <>
        <GeneralAlert
          type="error"
          title="サーバエラー"
          content={`予期しないエラーが発生し、ソーシャルログインに失敗しました。\n恐れ入りますが時間をおいて再度お試しください。`}
        />
        <Box py={2} textAlign="center">
          <Typography variant="caption">
            <Link to="/login">ログイン画面</Link>
            に戻る
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box textAlign="center">
      <CircularProgress color="inherit" />
    </Box>
  );
};

const SocialLoginProgress: FC<Props> = ({ oAuthError, statusCode }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xs">
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader
              title={
                oAuthError || statusCode
                  ? 'ソーシャルログイン処理失敗'
                  : 'ソーシャルログイン処理中...'
              }
              style={{ textAlign: 'center' }}
            />
            <CardContent>
              <Content oAuthError={oAuthError} statusCode={statusCode} />
            </CardContent>
          </Card>
        </Container>
      </main>
    </>
  );
};

export default SocialLoginProgress;
