import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { UNPROCESSABLE_ENTITY } from '../../constants/statusCode';
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
      let errorMessage = 'メモの更新に失敗しました。';
      if (error.response?.status === UNPROCESSABLE_ENTITY) {
        const msgArrayList = (Object.values(
          error.response.data.errors
        ) as string[][]).map((msgArray) => msgArray);
        errorMessage = msgArrayList
          .flat()
          .reduce((createMsg, msg) => `${createMsg}\n${msg}`, errorMessage);
      }
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage,
      };
      queryClient.setQueryData('error', mutationError);
    },
  });
};

export default usePatchMemoMutation;
