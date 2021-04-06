import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import BackButton from '../atoms/BackButton';
import DeleteMemoButton from '../atoms/DeleteMemoButton';

type Props = {
  handleBack: VoidFunction;
  handleDeleteDialogOpen: VoidFunction;
};

const MemoDetailHeader: FC<Props> = ({
  handleBack,
  handleDeleteDialogOpen,
}) => (
  <Box height={48} px={2} display="flex" justifyContent="flex-end">
    <Box flexGrow={1} display={{ xs: 'block', sm: 'none' }}>
      <BackButton handleBack={handleBack} />
    </Box>
    <Box>
      <DeleteMemoButton handleDeleteDialogOpen={handleDeleteDialogOpen} />
    </Box>
  </Box>
);

export default MemoDetailHeader;
