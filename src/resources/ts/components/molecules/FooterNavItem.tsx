import React, { FC } from 'react';
import { Link as InternalLink } from 'react-router-dom';
import ExternalLink from '@material-ui/core/Link';
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
  type: 'internal' | 'external';
  title: string;
  linkUrl: string;
};

const FooterNavItem: FC<Props> = ({ type, title, linkUrl }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.footerMenuItem}>
      {type === 'internal' && (
        <InternalLink to={linkUrl} className={classes.footerMenuItemLink}>
          {title}
        </InternalLink>
      )}
      {type === 'external' && (
        <ExternalLink
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className={classes.footerMenuItemLink}
        >
          {title}
        </ExternalLink>
      )}
    </ListItem>
  );
};

export default FooterNavItem;
