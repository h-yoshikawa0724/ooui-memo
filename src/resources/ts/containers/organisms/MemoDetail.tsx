import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MemoDetail from '../../components/organisms/MemoDetail';

const EnhancedMemoDetail: FC = () => {
  const history = useHistory();
  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleDeleteMemo = useCallback(() => {
    // 仮
    console.log('Delete Memo');
  }, []);

  return (
    <MemoDetail handleBack={handleBack} handleDeleteMemo={handleDeleteMemo} />
  );
};

export default EnhancedMemoDetail;
