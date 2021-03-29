import React, { FC, useCallback } from 'react';
import MemoList from '../../components/organisms/MemoList';

const EnhancedMemoList: FC = () => {
  const handleAddMemo = useCallback(() => {
    // 仮
    console.log('Add Memo');
  }, []);

  const handleSelectItem = useCallback(() => {
    // 仮
    console.log('Select Item');
  }, []);

  return (
    <MemoList
      handleAddMemo={handleAddMemo}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default EnhancedMemoList;
