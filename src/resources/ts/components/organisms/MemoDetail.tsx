import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import MemoDetailHeader from '../molecules/MemoDetailHeader';
import MemoDetailFooter from '../molecules/MemoDetailFooter';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from '../../constants/statusCode';
import { Memo } from '../../models/Memo';

type Props = {
  memo?: Memo;
  title: string;
  content: string;
  isIdle: boolean;
  isLoading: boolean;
  statusCode?: number;
  handleChangeTitle: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBack: VoidFunction;
  handleDeleteMemo: VoidFunction;
};

const MemoDetail: FC<Props> = ({
  memo,
  title,
  content,
  isIdle,
  isLoading,
  statusCode,
  handleChangeTitle,
  handleChangeContent,
  handleBack,
  handleDeleteMemo,
}) => {
  const theme = useTheme();

  if (isIdle || isLoading) {
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

  if (statusCode) {
    return (
      <>
        <Box height={48} px={2} />
        <Box py={2}>
          {statusCode === NOT_FOUND && (
            <Alert severity="error">
              <AlertTitle>メモデータが見つかりません</AlertTitle>
              このIDのメモデータは存在しません。メモ一覧からメモを選択してください。
            </Alert>
          )}
          {statusCode === INTERNAL_SERVER_ERROR && (
            <Alert severity="error">
              <AlertTitle>サーバエラー</AlertTitle>
              予期しないエラーが発生し、メモデータ取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。
            </Alert>
          )}
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
          placeholder="メモタイトル"
          disableUnderline
          fullWidth
          value={title || memo?.title}
          inputProps={{ 'aria-label': 'memo-title' }}
          style={theme.typography.h4}
          onChange={handleChangeTitle}
        />
        <Box my={4}>
          <Input
            placeholder="メモ内容"
            disableUnderline
            fullWidth
            multiline
            value={content || memo?.content}
            inputProps={{ 'aria-label': 'memo-content' }}
            style={{ whiteSpace: 'pre-wrap' }}
            onChange={handleChangeContent}
          />
        </Box>
        <MemoDetailFooter contentCount={memo?.content.length} />
      </Box>
    </>
  );
};

export default MemoDetail;
