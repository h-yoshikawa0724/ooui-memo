import React, { FC } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
  handleDeleteMemo: VoidFunction;
};

const DeleteButton: FC<Props> = ({ handleDeleteMemo }) => {
  const deleteId = 'delete-memo';
  return (
    <Tooltip title="このメモを削除">
      <IconButton
        aria-label="delete current memo"
        aria-controls={deleteId}
        aria-haspopup="true"
        color="inherit"
        onClick={handleDeleteMemo}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
