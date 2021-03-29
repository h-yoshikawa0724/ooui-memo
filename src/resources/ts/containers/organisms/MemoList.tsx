import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MemoList from '../../components/organisms/MemoList';
import { useGetMemoListQuery } from '../../hooks/memo';

const EnhancedMemoList: FC = () => {
  const { data } = useGetMemoListQuery();

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
      listData={data?.pages}
      handleAddMemo={handleAddMemo}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default EnhancedMemoList;
