import React, { FC, useCallback } from 'react';
import MemoDetail from '../../components/organisms/MemoDetail';

const EnhancedMemoDetail: FC = () => {
  const handleBack = useCallback(() => {
    // 仮
    console.log('Back');
  }, []);

  const handleDeleteMemo = useCallback(() => {
    // 仮
    console.log('Delete Memo');
  }, []);

  return (
    <MemoDetail handleBack={handleBack} handleDeleteMemo={handleDeleteMemo} />
  );
};

export default EnhancedMemoDetail;
