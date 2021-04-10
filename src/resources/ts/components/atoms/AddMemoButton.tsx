import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

type Props = {
  handleAddMemo: VoidFunction;
};

const AddButton: FC<Props> = ({ handleAddMemo }) => (
  <Tooltip title="メモを新規作成">
    <IconButton
      aria-label="メモを新規作成"
      color="inherit"
      onClick={handleAddMemo}
    >
      <AddIcon />
    </IconButton>
  </Tooltip>
);

export default AddButton;
