import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import AddMemoButton from '../atoms/AddMemoButton';

type Props = {
  handleAddMemo: VoidFunction;
};

const MemoListHeader: FC<Props> = ({ handleAddMemo }) => (
  <Box height={48} px={2} textAlign="right">
    <AddMemoButton handleAddMemo={handleAddMemo} />
  </Box>
);

export default MemoListHeader;
