import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  sidebarMenuItem: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

type Props = {
  title: string;
  linkUrl: string;
};

const SideBarItem: FC<Props> = ({ title, linkUrl }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <MenuItem selected={pathname === linkUrl}>
      <Link to={linkUrl} className={classes.sidebarMenuItem}>
        {title}
      </Link>
    </MenuItem>
  );
};

export default SideBarItem;
