import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type Props = {
  menuId: string;
  edge?: 'start' | 'end' | false;
  handleAccountMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AccountButton: FC<Props> = ({ menuId, edge, handleAccountMenuOpen }) => (
  <IconButton
    edge={edge || false}
    aria-label="アカウントメニューを開く"
    aria-controls={menuId}
    aria-haspopup="menu"
    onClick={handleAccountMenuOpen}
    color="inherit"
  >
    <AccountCircleIcon />
  </IconButton>
);

export default AccountButton;
