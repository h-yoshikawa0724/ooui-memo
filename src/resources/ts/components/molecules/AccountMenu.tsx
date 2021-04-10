import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

type Props = {
  userName?: string;
  anchorEl: Element | null;
  open: boolean;
  handleAccountMenuClose: VoidFunction;
  handleLogout: VoidFunction;
};

const AccountMenu: FC<Props> = ({
  userName,
  anchorEl,
  open,
  handleAccountMenuClose,
  handleLogout,
}) => {
  const menuId = 'account-menu';
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
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
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <Typography>ログアウト</Typography>
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
