import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';
import MemoListItemSkeleton from '../molecules/MemoListItemSkeleton';
import { INTERNAL_SERVER_ERROR } from '../../constants/statusCode';
import { Memos } from '../../models/Memos';

type Props = {
  paginateMemos?: Memos[];
  isLoading: boolean;
  statusCode?: number;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  handleAddMemo: VoidFunction;
  handleSelectItem: (memoId: string) => void;
};

const MemoList: FC<Props> = ({
  paginateMemos,
  isLoading,
  statusCode,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  handleAddMemo,
  handleSelectItem,
}) => {
  if (statusCode) {
    return (
      <>
        <Box height={48} px={2} />
        {statusCode === INTERNAL_SERVER_ERROR && (
          <Alert severity="error">
            <AlertTitle>サーバエラー</AlertTitle>
            予期しないエラーが発生し、メモデータ取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。
          </Alert>
        )}
      </>
    );
  }

  let loadMoreMessage;
  if (isFetchingNextPage) {
    loadMoreMessage = '読み込み中...';
  } else {
    loadMoreMessage = hasNextPage ? '続きを読み込む' : ' ';
  }

  // エラー時の描画内容のように、ローディング時の描画内容は先に書いておいて return させたかったが、
  // loadMoreRef を持つ Box コンポーネントが最初からないと無限スクロールが動作しなくなるので、こういう書き方にした
  return (
    <>
      {isLoading ? (
        <Box height={48} px={2} />
      ) : (
        <MemoListHeader handleAddMemo={handleAddMemo} />
      )}
      <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
        {isLoading
          ? [1, 2, 3, 4, 5].map((value) => (
              <MemoListItemSkeleton value={value} />
            ))
          : paginateMemos?.map((page) => (
              <React.Fragment key={page.currentPage}>
                {page.data.map((memo) => (
                  <MemoListItem
                    key={memo.memoId}
                    memoId={memo.memoId}
                    title={memo.title}
                    content={memo.content}
                    handleSelectItem={handleSelectItem}
                  />
                ))}
              </React.Fragment>
            ))}
        <Box {...{ ref: loadMoreRef }} textAlign="center">
          {loadMoreMessage}
        </Box>
      </List>
    </>
  );
};

export default MemoList;
