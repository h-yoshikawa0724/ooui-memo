import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import SettingsSideBar from '../organisms/SettingsSideBar';

const useStyles = makeStyles(() => ({
  decorationLine: {
    borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
    borderImageSlice: 1,
  },
}));

type Props = {
  handleDeleteUser: VoidFunction;
};

const Account: FC<Props> = ({ handleDeleteUser }) => {
  const theme = useTheme();
  const classes = useStyles();
  const paddingY = 2;
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Grid container spacing={3} style={{ marginTop: theme.spacing(2) }}>
          <Grid item xs={12} sm={3}>
            <SettingsSideBar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper
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
                <Button color="secondary" variant="outlined">
                  アカウント削除
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Account;
