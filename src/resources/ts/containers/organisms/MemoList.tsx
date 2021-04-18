import React, { FC, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MemoList from '../../components/organisms/MemoList';
import { useGetMemoListQuery, usePostMemoMutation } from '../../hooks/memo';
import { useIntersectionObserver } from '../../hooks/util';

type Props = {
  memoId?: string;
};

const EnhancedMemoList: FC<Props> = ({ memoId }) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const {
    isFetching,
    isLoading,
    error,
    data: paginateMemos,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemoListQuery(searchWord);
  const history = useHistory();
  const statusCode = error?.response?.status;

  // データ取得中でない + 画面幅が広い + メモ未選択時は、メモ一覧の一番新しいメモへ遷移
  const theme = useTheme();
  const iswideDisplay = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(() => {
    const firstMemoId = paginateMemos?.pages[0]?.data[0]?.memoId;
    if (!isFetching && !memoId && iswideDisplay && firstMemoId) {
      history.push(`/${firstMemoId}`);
    }
  }, [history, isFetching, paginateMemos, memoId, iswideDisplay]);

  const handleChangeSearchWord = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(ev.target.value);
    },
    []
  );
  // 検索ワードが入力されたら再取得する
  useEffect(() => {
    refetch({ cancelRefetch: true });
  }, [refetch, searchWord]);

  // 無限スクロール処理
  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const { mutate } = usePostMemoMutation();
  const handleAddMemo = useCallback(() => {
    mutate({ title: '', content: '' });
  }, [mutate]);

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
      searchWord={searchWord}
      handleChangeSearchWord={handleChangeSearchWord}
      handleAddMemo={handleAddMemo}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default EnhancedMemoList;
