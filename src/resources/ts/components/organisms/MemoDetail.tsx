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

type Props = {
  title: string;
  content: string;
  isIdle: boolean;
  isLoading: boolean;
  statusCode?: number;
  isUnsaved: boolean;
  updatedAt?: Date;
  handleChangeTitle: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBack: VoidFunction;
  handleDeleteMemo: VoidFunction;
};

const MemoDetail: FC<Props> = ({
  title,
  content,
  isIdle,
  isLoading,
  statusCode,
  isUnsaved,
  updatedAt,
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
    <Box height={1} display="flex" flexDirection="column">
      <MemoDetailHeader
        handleBack={handleBack}
        handleDeleteMemo={handleDeleteMemo}
      />
      <Box
        py={2}
        style={{
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'scroll',
          flexGrow: 1,
        }}
      >
        <Input
          placeholder="メモタイトル"
          disableUnderline
          fullWidth
          multiline
          value={title}
          inputProps={{ 'aria-label': 'memo-title' }}
          style={{ ...theme.typography.h4, ...{ whiteSpace: 'pre-wrap' } }}
          onChange={handleChangeTitle}
        />
        <Box my={4}>
          <Input
            placeholder="メモ内容"
            disableUnderline
            fullWidth
            multiline
            value={content}
            inputProps={{ 'aria-label': 'memo-content' }}
            style={{ whiteSpace: 'pre-wrap' }}
            onChange={handleChangeContent}
          />
        </Box>
      </Box>
      <MemoDetailFooter
        marginTop={1}
        contentCount={content.length}
        isUnsaved={isUnsaved}
        updatedAt={updatedAt}
      />
    </Box>
  );
};

export default MemoDetail;
