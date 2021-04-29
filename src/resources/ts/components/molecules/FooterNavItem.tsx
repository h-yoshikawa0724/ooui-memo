import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footerMenuItem: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
      backgroundColor: 'inherit',
    },
  },
  footerMenuItemLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

type Props = {
  title: string;
  linkUrl: string;
};

const FooterNavItem: FC<Props> = ({ title, linkUrl }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.footerMenuItem}>
      <Link to={linkUrl} className={classes.footerMenuItemLink}>
        {title}
      </Link>
    </ListItem>
  );
};

export default FooterNavItem;
