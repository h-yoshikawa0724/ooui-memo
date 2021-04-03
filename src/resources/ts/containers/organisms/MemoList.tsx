import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MemoList from '../../components/organisms/MemoList';
import { useGetMemoListQuery } from '../../hooks/memo';
import { useIntersectionObserver } from '../../hooks/util';

type Props = {
  memoId?: string;
};

const EnhancedMemoList: FC<Props> = ({ memoId }) => {
  const {
    isLoading,
    error,
    data: paginateMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemoListQuery();
  const history = useHistory();
  const statusCode = error?.response?.status;

  // 画面幅が広い + メモ未選択時は、メモ一覧の一番新しいメモへ遷移
  const theme = useTheme();
  const iswideDisplay = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(() => {
    const firstMemoId = paginateMemos?.pages[0]?.data[0].memoId;
    if (!memoId && iswideDisplay && firstMemoId) {
      history.push(`/${firstMemoId}`);
    }
  }, [history, paginateMemos, memoId, iswideDisplay]);

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const handleAddMemo = useCallback(() => {
    // 仮
    console.log('Add Memo');
  }, []);

  const handleSelectItem = useCallback(
    (selectMemoId: string) => {
      history.push(`/${selectMemoId}`);
    },
    [history]
  );

  return (
    <MemoList
      paginateMemos={paginateMemos?.pages}
      isLoading={isLoading}
      statusCode={statusCode}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      handleAddMemo={handleAddMemo}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default EnhancedMemoList;
