import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

type Props = {
  logined: boolean;
};

const Header: FC<Props> = ({ logined }) => {
  const history = useHistory();
  const theme = useTheme();

  const handleLogout = useCallback(async () => {
    await axios.post('/api/logout').then((response) => {
      history.push('/login');
    });
  }, [history]);

  return (
    <>
      <AppBar
        position="sticky"
        style={{ color: theme.palette.text.primary, backgroundColor: 'white' }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            style={{ flexGrow: 1 }}
            align="center"
          >
            OOUI-MEMO
          </Typography>
          {logined && (
            <button type="button" onClick={handleLogout}>
              ログアウト
            </button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
