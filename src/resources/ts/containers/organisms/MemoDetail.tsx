import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MemoDetail from '../../components/organisms/MemoDetail';
import { useGetMemoQuery } from '../../hooks/memo';

type Props = {
  memoId: string;
};

const EnhancedMemoDetail: FC<Props> = ({ memoId }) => {
  const { data: memo, isLoading } = useGetMemoQuery(memoId, {
    enabled: !!memoId,
  });

  const history = useHistory();
  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleDeleteMemo = useCallback(() => {
    // 仮
    console.log('Delete Memo');
  }, []);

  return (
    <MemoDetail
      memo={memo}
      isLoading={isLoading}
      handleBack={handleBack}
      handleDeleteMemo={handleDeleteMemo}
    />
  );
};

export default EnhancedMemoDetail;
