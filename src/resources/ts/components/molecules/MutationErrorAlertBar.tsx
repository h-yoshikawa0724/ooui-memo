import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from '../../constants/statusCode';
import { MutationError } from '../../models/MutationError';

type Props = {
  error?: MutationError;
  handleErrorBarClose: (event?: React.SyntheticEvent, reason?: string) => void;
};

const MutationErrorAlert: FC<Props> = ({ error, handleErrorBarClose }) => (
  // Snackbarの子要素は1つの要素を返す必要があるので、FragmentでなくBoxで囲む
  <Box>
    {error?.statusCode === NOT_FOUND && (
      <Alert onClose={handleErrorBarClose} severity="error">
        <AlertTitle>リソースが見つからないエラー</AlertTitle>
        {error?.errorMessage}
      </Alert>
    )}
    {error?.statusCode === INTERNAL_SERVER_ERROR && (
      <Alert onClose={handleErrorBarClose} severity="error">
        <AlertTitle>サーバエラー</AlertTitle>
        {error?.errorMessage}
      </Alert>
    )}
  </Box>
);

const MutationErrorAlertBar: FC<Props> = ({ error, handleErrorBarClose }) => (
  <Snackbar
    key={`${error?.statusCode}-${error?.errorMessage}`}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={!!error}
    autoHideDuration={6000}
    onClose={handleErrorBarClose}
  >
    <MutationErrorAlert
      error={error}
      handleErrorBarClose={handleErrorBarClose}
    />
  </Snackbar>
);

export default MutationErrorAlertBar;
