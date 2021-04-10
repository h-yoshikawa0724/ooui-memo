import React, { FC, useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import GeneralAlert from '../atoms/GeneralAlert';
import MemoDetailHeader from '../molecules/MemoDetailHeader';
import MemoDetailFooter from '../molecules/MemoDetailFooter';
import MemoDeleteDialog from '../molecules/MemoDeleteDialog';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from '../../constants/statusCode';

type Props = {
  title: string;
  titleError: string;
  content: string;
  contentError: string;
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
  titleError,
  content,
  contentError,
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

  // componentsには基本的にロジックを持たせないが、UIの状態に関するものなので、ここで定義している
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const handleDeleteDialogOpen = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);
  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

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
            <GeneralAlert
              type="error"
              title="メモデータが見つかりません"
              content="このIDのメモデータは存在しません。メモ一覧からメモを選択してください。"
            />
          )}
          {statusCode === INTERNAL_SERVER_ERROR && (
            <GeneralAlert
              type="error"
              title="サーバエラー"
              content="予期しないエラーが発生し、メモデータ取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。"
            />
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      <Box height={1} display="flex" flexDirection="column">
        <MemoDetailHeader
          handleBack={handleBack}
          handleDeleteDialogOpen={handleDeleteDialogOpen}
        />
        {/* 182px = ヘッダー：64 + メモ詳細ヘッダー：48 + メモ詳細フッター：42 + 下部余白：28 */}
        <Box
          py={2}
          style={{
            height: 'calc(100vh - 182px)',
            overflowY: 'scroll',
            flexGrow: 1,
          }}
        >
          <FormControl error={!!titleError}>
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
            <FormHelperText id="memo-title-error-text">
              {titleError}
            </FormHelperText>
          </FormControl>
          <Box my={4}>
            <FormControl error={!!contentError}>
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
              <FormHelperText id="memo-content-error-text">
                {contentError}
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
        <MemoDetailFooter
          marginTop={1}
          contentCount={content.length}
          isUnsaved={isUnsaved}
          updatedAt={updatedAt}
        />
      </Box>
      <MemoDeleteDialog
        open={isDeleteDialogOpen}
        handleDeleteDialogClose={handleDeleteDialogClose}
        handleDeleteMemo={handleDeleteMemo}
      />
    </>
  );
};

export default MemoDetail;
