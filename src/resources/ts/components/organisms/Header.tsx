import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';

type Props = {
  logined: boolean;
  handleLogout: VoidFunction;
};

const Header: FC<Props> = ({ logined, handleLogout }) => {
  const theme = useTheme();
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
          <Button type="button" onClick={handleLogout}>
            ログアウト
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </>
  )
};

export default Header;
