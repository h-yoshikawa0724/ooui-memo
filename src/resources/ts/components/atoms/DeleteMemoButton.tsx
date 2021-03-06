import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  dialogId: string;
  handleDeleteDialogOpen: VoidFunction;
};

const DeleteButton: FC<Props> = ({ dialogId, handleDeleteDialogOpen }) => (
  <Tooltip title="このメモを削除">
    <IconButton
      aria-label="このメモを削除"
      aria-controls={dialogId}
      aria-haspopup="dialog"
      color="inherit"
      onClick={handleDeleteDialogOpen}
    >
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);

export default DeleteButton;
