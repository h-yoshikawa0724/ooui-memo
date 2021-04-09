import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

type Props = {
  type: 'error' | 'info' | 'success' | 'warning';
  title: string;
  content: string;
  onClose?: VoidFunction;
};

const GeneralAlert: FC<Props> = ({ type, title, content, onClose }) => (
  <Alert severity={type} onClose={onClose} style={{ whiteSpace: 'pre-wrap' }}>
    <AlertTitle>{title}</AlertTitle>
    {content}
  </Alert>
);

export default GeneralAlert;
