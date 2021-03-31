import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTheme } from '@material-ui/core/styles';
import MemoDetailHeader from '../molecules/MemoDetailHeader';
import MemoDetailFooter from '../molecules/MemoDetailFooter';
import { Memo } from '../../models/Memo';

type Props = {
  memo?: Memo;
  isLoading: boolean;
  handleBack: VoidFunction;
  handleDeleteMemo: VoidFunction;
};

const MemoDetail: FC<Props> = ({
  memo,
  isLoading,
  handleBack,
  handleDeleteMemo,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <>
        <Box height={48} px={2} />
        <Box py={2}>
          <Skeleton variant="text" style={theme.typography.h4} />
          <Box my={4}>
            <Skeleton variant="rect" height={240} />
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <MemoDetailHeader
        handleBack={handleBack}
        handleDeleteMemo={handleDeleteMemo}
      />
      <Box
        py={2}
        style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}
      >
        <Input
          placeholder="タイトル"
          disableUnderline
          fullWidth
          multiline
          value={memo?.title}
          inputProps={{ 'aria-label': 'memo-title' }}
          style={theme.typography.h4}
        />
        <Box my={4}>
          <Input
            placeholder="内容"
            disableUnderline
            fullWidth
            multiline
            value={memo?.content}
            inputProps={{ 'aria-label': 'memo-note' }}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </Box>
        <MemoDetailFooter contentCount={memo?.content.length} />
      </Box>
    </>
  );
};

export default MemoDetail;
