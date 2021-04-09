import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MemoDetail from '../../components/organisms/MemoDetail';
import {
  useGetMemoQuery,
  usePatchMemoMutation,
  useDeleteMemoMutation,
} from '../../hooks/memo';

type Props = {
  memoId: string;
};

const EnhancedMemoDetail: FC<Props> = ({ memoId }) => {
  // フォームの項目が増える場合は、状態を個別でなくまとめて管理にしたほうが良さそう
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [contentError, setContentError] = useState<string>('');
  // メモの未保存データがあるかどうか
  const unsavedRef = useRef(false);

  // メモ選択時でメモの未保存データがない場合のみ、データ取得を行う
  const { isIdle, isLoading, error, data: memo } = useGetMemoQuery(memoId, {
    enabled: !!memoId && !unsavedRef.current,
    onSuccess: (data) => {
      // データ取得中に未保存フラグが切り変わった時のために、ここでも分岐を入れないと未保存データが飛ぶ
      if (!unsavedRef.current) {
        setTitle(data.title);
        setContent(data.content);
      }
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
      if (ev.target.value.length > 100) {
        setTitleError('メモタイトルの文字数が最大文字数100を超えています。');
      } else {
        setTitleError('');
      }
      setTitle(ev.target.value);
      unsavedRef.current = true;
      clearTimeout(timeId);
    },
    [timeId]
  );

  const handleChangeContent = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (ev.target.value.length > 65535) {
        setContentError('メモ内容の文字数が最大文字数65535を超えています。');
      } else {
        setContentError('');
      }
      setContent(ev.target.value);
      unsavedRef.current = true;
      clearTimeout(timeId);
    },
    [timeId]
  );

  const { mutate: updateMutate } = usePatchMemoMutation();
  // 入力後に3秒入力がなかった場合のみ更新をかける
  useEffect(() => {
    // 未保存データがないかバリデーションエラーがあるときはスキップ
    if (!unsavedRef.current || titleError || contentError) {
      return;
    }
    const tId = window.setTimeout(() => {
      const memoData = { title, content };
      updateMutate(
        { memoId, memoData },
        {
          onSuccess: () => {
            unsavedRef.current = false;
          },
        }
      );
    }, 3000);
    setTimeId(tId);
  }, [memoId, title, titleError, content, contentError, updateMutate]);

  const { mutate: deleteMutate } = useDeleteMemoMutation();
  const handleDeleteMemo = useCallback(() => {
    deleteMutate(memoId, {
      onSuccess: () => {
        history.push('/');
      },
    });
  }, [history, memoId, deleteMutate]);

  return (
    <MemoDetail
      title={title}
      titleError={titleError}
      content={content}
      contentError={contentError}
      isIdle={isIdle}
      isLoading={isLoading}
      statusCode={statusCode}
      isUnsaved={unsavedRef.current}
      updatedAt={memo?.updatedAt}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      handleBack={handleBack}
      handleDeleteMemo={handleDeleteMemo}
    />
  );
};

export default EnhancedMemoDetail;
