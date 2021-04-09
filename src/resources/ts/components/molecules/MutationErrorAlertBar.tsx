import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import GeneralAlert from '../atoms/GeneralAlert';
import {
  NOT_FOUND,
  UNKNOWN_STATUS,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} from '../../constants/statusCode';
import { MutationError } from '../../models/MutationError';

type Props = {
  error?: MutationError;
  handleErrorBarClose: (event?: React.SyntheticEvent, reason?: string) => void;
};

const MutationErrorAlert: FC<Props> = ({ error, handleErrorBarClose }) => (
  // Snackbarの子要素は1つの要素を返す必要があるので、FragmentでなくBoxで囲む
  <Box boxShadow={3}>
    {error?.statusCode === NOT_FOUND && (
      <GeneralAlert
        type="error"
        title="リソースが見つからないエラー"
        content={error?.errorMessage}
        onClose={handleErrorBarClose}
      />
    )}
    {error?.statusCode === UNPROCESSABLE_ENTITY && (
      <GeneralAlert
        type="error"
        title="バリデーションエラー"
        content={error?.errorMessage}
        onClose={handleErrorBarClose}
      />
    )}
    {(error?.statusCode === UNKNOWN_STATUS ||
      error?.statusCode === INTERNAL_SERVER_ERROR) && (
      <GeneralAlert
        type="error"
        title="サーバエラー"
        content={error?.errorMessage}
        onClose={handleErrorBarClose}
      />
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
