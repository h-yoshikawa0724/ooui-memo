import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type Props = {
  edge?: 'start' | 'end' | false;
  handleAccountMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AccountButton: FC<Props> = ({ edge, handleAccountMenuOpen }) => {
  const menuId = 'account-menu';
  return (
    <IconButton
      edge={edge || false}
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleAccountMenuOpen}
      color="inherit"
    >
      <AccountCircleIcon />
    </IconButton>
  );
};

export default AccountButton;
