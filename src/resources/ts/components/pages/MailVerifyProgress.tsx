import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import GeneralAlert from '../atoms/GeneralAlert';

type Props = {
  isLoading: boolean;
  statusCode?: number;
};

const Content: FC<Props> = ({ isLoading, statusCode }) => {
  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (statusCode) {
    return (
      <>
        <GeneralAlert
          type="error"
          title="サーバエラー"
          content={`予期しないエラーが発生し、メール認証に失敗しました。\n恐れ入りますが時間をおいて再度お試しください。`}
        />
      </>
    );
  }

  return (
    <>
      <Typography align="center">メール確認が完了しました。</Typography>
      <Box py={2} textAlign="center">
        <Typography variant="caption">
          <Link to="/">アプリホーム</Link>へ
        </Typography>
      </Box>
    </>
  );
};

const MailVerifyProgress: FC<Props> = ({ isLoading, statusCode }) => {
  const theme = useTheme();
  let title;
  if (isLoading) {
    title = 'メール認証処理中...';
  } else {
    title = statusCode ? 'メール認証処理失敗' : 'メール認証処理成功';
  }

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xs">
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title={title} style={{ textAlign: 'center' }} />
            <CardContent>
              <Content isLoading={isLoading} statusCode={statusCode} />
            </CardContent>
          </Card>
        </Container>
      </main>
    </>
  );
};

export default MailVerifyProgress;
