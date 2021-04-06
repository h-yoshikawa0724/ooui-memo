import React, { FC } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  handleDeleteDialogOpen: VoidFunction;
};

const DeleteButton: FC<Props> = ({ handleDeleteDialogOpen }) => {
  const deleteId = 'delete-memo';
  return (
    <Tooltip title="このメモを削除">
      <IconButton
        aria-label="delete current memo"
        aria-controls={deleteId}
        aria-haspopup="true"
        color="inherit"
        onClick={handleDeleteDialogOpen}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
