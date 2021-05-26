import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

type Props = {
  type: 'register' | 'login';
};

const LegalLink: FC<Props> = ({ type }) => (
  <>
    {type === 'register' && (
      <Typography>
        <Link to="/terms" target="_blank" rel="noreferrer">
          利用規約
        </Link>
        、
        <Link to="/policy" target="_blank" rel="noreferrer">
          プライバシーポリシー
        </Link>
        に同意します。
      </Typography>
    )}
    {type === 'login' && (
      <Typography variant="caption">
        <Link to="/terms" target="_blank" rel="noreferrer">
          利用規約
        </Link>
        、
        <Link to="/policy" target="_blank" rel="noreferrer">
          プライバシーポリシー
        </Link>
        に同意したうえで、ご利用ください。
      </Typography>
    )}
  </>
);

export default LegalLink;
