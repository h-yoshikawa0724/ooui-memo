import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Memo } from '../../models/Memo';
import { MutationError } from '../../models/MutationError';

type MemoData = {
  title: string;
  content: string;
};

const updateMemo = async (
  memoId: string,
  memoData: MemoData
): Promise<Memo> => {
  const { data } = await axios.patch(`/api/memos/${memoId}`, memoData);
  return data;
};

const usePatchMemoMutation = (): UseMutationResult<
  Memo,
  AxiosError,
  { memoId: string; memoData: MemoData },
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(({ memoId, memoData }) => updateMemo(memoId, memoData), {
    onSuccess: ({ memoId }) => {
      queryClient.invalidateQueries(['memos']);
      queryClient.invalidateQueries(['memo', memoId]);
    },
    onError: (error) => {
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage: 'メモの更新に失敗しました。',
      };
      queryClient.setQueryData(['memo', 'error'], mutationError);
    },
  });
};

export default usePatchMemoMutation;
