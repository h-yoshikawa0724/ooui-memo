import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';

type Props = {
  handleMailResend: VoidFunction;
};

const MailVerify: FC<Props> = ({ handleMailResend }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xs">
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title="メール認証" style={{ textAlign: 'center' }} />
            <CardContent>
              <Typography paragraph>
                認証用のメールを送信しました。
                <br />
                メールに記載のボタンリンクを押して、メール認証を行ってください。
              </Typography>
              <Box textAlign="center">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleMailResend}
                >
                  認証メールの再送信
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </main>
    </>
  );
};

export default MailVerify;
