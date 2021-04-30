import React, { FC, useState, useCallback } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import SettingsSideBar from '../organisms/SettingsSideBar';
import UserDeleteDialog from '../molecules/UserDeleteDialog';
import UserDeleteAlert from '../molecules/UserDeleteAlert';
import Footer from '../organisms/Footer';

const useStyles = makeStyles(() => ({
  decorationLine: {
    borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
    borderImageSlice: 1,
  },
}));

type Props = {
  statusCode?: number;
  isLoading: boolean;
  handleDeleteUser: VoidFunction;
};

const Account: FC<Props> = ({ statusCode, isLoading, handleDeleteUser }) => {
  const theme = useTheme();
  const classes = useStyles();
  const paddingY = 2;

  const dialogId = 'delete-user-confirm';

  // componentsには基本的にロジックを持たせないが、UIの状態に関するものなので、ここで定義している
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const handleDeleteDialogOpen = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);
  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  return (
    // 縦幅が足りないのでフッター下部固定のためのflex
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container maxWidth="md" style={{ flex: 1 }}>
        <Grid
          container
          spacing={3}
          style={{
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
          }}
        >
          <Grid item xs={12} sm={3}>
            <SettingsSideBar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper
              component="section"
              style={{
                padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
              }}
            >
              <Box
                py={paddingY}
                borderBottom={2}
                className={classes.decorationLine}
              >
                <Typography component="h2" variant="h4">
                  アカウント設定
                </Typography>
              </Box>
              <Box pt={paddingY * 2} pb={paddingY}>
                <Typography
                  component="h3"
                  variant="h5"
                  color="secondary"
                  paragraph
                >
                  アカウント削除
                </Typography>
                <Typography paragraph>
                  削除すると元に戻すことは出来ません。
                </Typography>
                {statusCode && (
                  <Box mb={2}>
                    <UserDeleteAlert statusCode={statusCode} />
                  </Box>
                )}
                <Button
                  color="secondary"
                  variant="outlined"
                  aria-label="ログインユーザを削除"
                  aria-controls={dialogId}
                  aria-haspopup="dialog"
                  onClick={handleDeleteDialogOpen}
                >
                  アカウント削除
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <UserDeleteDialog
        dialogId={dialogId}
        open={isDeleteDialogOpen}
        handleDeleteDialogClose={handleDeleteDialogClose}
        handleDeleteUser={handleDeleteUser}
      />
      <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Account;
