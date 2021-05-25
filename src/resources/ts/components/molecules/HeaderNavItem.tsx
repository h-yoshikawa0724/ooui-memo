import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  headerItem: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

type Props = {
  title: string;
  linkUrl: string;
};

const HeaderNavItem: FC<Props> = ({ title, linkUrl }) => {
  const classes = useStyles();
  return (
    <Button>
      <Link to={linkUrl} className={classes.headerItem}>
        {title}
      </Link>
    </Button>
  );
};

export default HeaderNavItem;
