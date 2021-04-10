import React, { FC } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

type Props = {
  anchorEl: Element | null;
  open: boolean;
  handleAccountMenuClose: VoidFunction;
  handleLogout: VoidFunction;
};

const AccountMenu: FC<Props> = ({
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
      <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
    </Menu>
  );
};

export default AccountMenu;
