import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Memo from '../../components/pages/Memo';
import { useMemoMutationErrorQuery } from '../../hooks/memo';

const EnhancedMemo: FC = () => {
  const { memoId = '' } = useParams<{ memoId?: string }>();

  const { data: error } = useMemoMutationErrorQuery();
  const queryClient = useQueryClient();

  const handleErrorBarClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      queryClient.resetQueries('error');
    },
    [queryClient]
  );

  return (
    <Memo
      memoId={memoId}
      error={error}
      handleErrorBarClose={handleErrorBarClose}
    />
  );
};

export default EnhancedMemo;
