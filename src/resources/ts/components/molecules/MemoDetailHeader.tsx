import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import BackButton from '../atoms/BackButton';
import DeleteMemoButton from '../atoms/DeleteMemoButton';

type Props = {
  dialogId: string;
  handleBack: VoidFunction;
  handleDeleteDialogOpen: VoidFunction;
};

const MemoDetailHeader: FC<Props> = ({
  dialogId,
  handleBack,
  handleDeleteDialogOpen,
}) => (
  <Box height={48} pl={1} pr={2} display="flex" justifyContent="flex-end">
    <Hidden smUp>
      <Box flexGrow={1}>
        <BackButton edge="start" handleBack={handleBack} />
      </Box>
    </Hidden>
    <Box>
      <DeleteMemoButton
        dialogId={dialogId}
        handleDeleteDialogOpen={handleDeleteDialogOpen}
      />
    </Box>
  </Box>
);

export default MemoDetailHeader;
