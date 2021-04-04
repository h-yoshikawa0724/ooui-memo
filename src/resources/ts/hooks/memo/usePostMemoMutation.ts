import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Memo } from '../../models/Memo';

type MemoData = {
  title: string;
  content: string;
};

const createMemo = async (memoData: MemoData): Promise<Memo> => {
  const { data } = await axios.post('api/memos', memoData);
  return data;
};

const usePostMemoMutation = (): UseMutationResult<
  Memo,
  AxiosError,
  MemoData,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(createMemo, {
    onSuccess: () => {
      queryClient.invalidateQueries('memos');
    },
  });
};

export default usePostMemoMutation;
