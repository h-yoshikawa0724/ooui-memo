import React, { FC, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MemoList from '../../components/organisms/MemoList';
import { useGetMemoListQuery } from '../../hooks/memo';
import { useIntersectionObserver } from '../../hooks/util';

const EnhancedMemoList: FC = () => {
  const {
    isLoading,
    error,
    data: paginateMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemoListQuery();
  const statusCode = error?.response?.status;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const history = useHistory();
  const handleAddMemo = useCallback(() => {
    // 仮
    console.log('Add Memo');
  }, []);

  const handleSelectItem = useCallback(
    (memoId: string) => {
      history.push(`/${memoId}`);
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
