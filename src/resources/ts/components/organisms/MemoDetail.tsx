import React, { FC } from 'react';
import { Box, Input } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import MemoDetailHeader from '../molecules/MemoDetailHeader';
import MemoDetailFooter from '../molecules/MemoDetailFooter';

type Props = {
  handleBack: VoidFunction;
  handleDeleteMemo: VoidFunction;
};

const MemoDetail: FC<Props> = ({ handleBack, handleDeleteMemo }) => {
  const theme = useTheme();
  const text =
    'テキストテスト <br />テキストテスト\nテキストテスト テキストテスト テキストテスト';
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
          inputProps={{ 'aria-label': 'memo-title' }}
          style={theme.typography.h4}
        />
        <Box my={4}>
          <Input
            placeholder="内容"
            disableUnderline
            fullWidth
            multiline
            value={text}
            inputProps={{ 'aria-label': 'memo-note' }}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </Box>
        <MemoDetailFooter contentCount={text.length} />
      </Box>
    </>
  );
};

export default MemoDetail;
