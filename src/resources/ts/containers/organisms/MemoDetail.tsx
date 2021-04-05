import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MemoDetail from '../../components/organisms/MemoDetail';
import { useGetMemoQuery, usePatchMemoMutation } from '../../hooks/memo';

type Props = {
  memoId: string;
};

const EnhancedMemoDetail: FC<Props> = ({ memoId }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // メモの未保存データがあるかどうか
  const unsavedRef = useRef(false);

  // メモ選択時でメモの未保存データがない場合のみ、データ取得を行う
  const { isIdle, isLoading, error } = useGetMemoQuery(memoId, {
    enabled: !!memoId && !unsavedRef.current,
    onSuccess: (memo) => {
      setTitle(memo.title);
      setContent(memo.content);
    },
  });
  const statusCode = error?.response?.status;

  const history = useHistory();
  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  const [timeId, setTimeId] = useState<number>();

  const handleChangeTitle = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(ev.target.value);
      unsavedRef.current = true;
      clearTimeout(timeId);
    },
    [timeId]
  );

  const handleChangeContent = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(ev.target.value);
      unsavedRef.current = true;
      clearTimeout(timeId);
    },
    [timeId]
  );

  const { mutate } = usePatchMemoMutation();
  // 入力後に3秒入力がなかった場合のみ更新をかける
  useEffect(() => {
    if (!unsavedRef.current) {
      return;
    }
    const tId = window.setTimeout(() => {
      const memoData = { title, content };
      mutate(
        { memoId, memoData },
        {
          onSuccess: () => {
            unsavedRef.current = false;
          },
        }
      );
    }, 3000);
    setTimeId(tId);
  }, [memoId, title, content, mutate]);

  const handleDeleteMemo = useCallback(() => {
    // 仮
    console.log('Delete Memo');
  }, []);

  return (
    <MemoDetail
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
