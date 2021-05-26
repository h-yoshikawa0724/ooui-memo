import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import GeneralAlert from '../atoms/GeneralAlert';

type Props = {
  successMessage?: string;
  handleSuccessBarClose: (
    event?: React.SyntheticEvent,
    reason?: string
  ) => void;
};

const MutationSuccessAlertBar: FC<Props> = ({
  successMessage = '',
  handleSuccessBarClose,
}) => (
  <Snackbar
    key={successMessage}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={!!successMessage}
    autoHideDuration={6000}
    onClose={handleSuccessBarClose}
  >
    <Box boxShadow={3}>
      <GeneralAlert
        type="success"
        title="成功"
        content={successMessage}
        onClose={handleSuccessBarClose}
      />
    </Box>
  </Snackbar>
);

export default MutationSuccessAlertBar;
