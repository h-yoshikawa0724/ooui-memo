import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MemoDetail from '../../components/organisms/MemoDetail';
import { useGetMemoQuery } from '../../hooks/memo';

type Props = {
  memoId: string;
};

const EnhancedMemoDetail: FC<Props> = ({ memoId }) => {
  const { isIdle, isLoading, error, data: memo } = useGetMemoQuery(memoId, {
    enabled: !!memoId,
  });
  const statusCode = error?.response?.status;

  const history = useHistory();
  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleChangeTitle = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(ev.target.value);
    },
    []
  );
  const handleChangeContent = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(ev.target.value);
    },
    []
  );

  const handleDeleteMemo = useCallback(() => {
    // 仮
    console.log('Delete Memo');
  }, []);

  return (
    <MemoDetail
      memo={memo}
      title={title}
      content={content}
      isIdle={isIdle}
      isLoading={isLoading}
      statusCode={statusCode}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      handleBack={handleBack}
      handleDeleteMemo={handleDeleteMemo}
    />
  );
};

export default EnhancedMemoDetail;
