import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Memo from '../../components/pages/Memo';

const EnhancedMemo: FC = () => {
  const { memoId = '' } = useParams<{ memoId?: string }>();
  return <Memo memoId={memoId} />;
};

export default EnhancedMemo;
