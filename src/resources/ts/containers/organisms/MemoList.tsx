import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MemoList from '../../components/organisms/MemoList';

const EnhancedMemoList: FC = () => {
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
      handleAddMemo={handleAddMemo}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default EnhancedMemoList;
