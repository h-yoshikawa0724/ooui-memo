import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(() => ({
  sidebarMenuItem: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

type Props = {
  menuId: string;
  userName?: string;
  anchorEl: Element | null;
  open: boolean;
  handleAccountMenuClose: VoidFunction;
  handleLogout: VoidFunction;
};

const AccountMenu: FC<Props> = ({
  menuId,
  userName,
  anchorEl,
  open,
  handleAccountMenuClose,
  handleLogout,
}) => {
  const classes = useStyles();
  return (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      onClose={handleAccountMenuClose}
    >
      <ListItem style={{ outline: 'none', whiteSpace: 'nowrap' }}>
        <Box
          maxWidth={150}
          fontWeight="fontWeightBold"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {userName}
        </Box>
      </ListItem>
      <Divider />
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          {/* 一時的にtermsに 後にaboutにする */}
          <Link to="/terms" className={classes.sidebarMenuItem}>
            ヘルプ
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link to="/settings/account" className={classes.sidebarMenuItem}>
            設定
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography>ログアウト</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
