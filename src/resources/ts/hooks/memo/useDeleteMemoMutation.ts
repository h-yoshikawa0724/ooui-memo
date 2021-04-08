import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { MutationError } from '../../models/MutationError';

const deleteMemo = async (memoId: string): Promise<void> => {
  await axios.delete(`/api/memos/${memoId}`);
};

const useDeleteMemoMutation = (): UseMutationResult<
  void,
  AxiosError,
  string,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(deleteMemo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['memos']);
    },
    onError: (error) => {
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage: 'メモの削除に失敗しました。',
      };
      queryClient.setQueryData(['memo', 'error'], mutationError);
    },
  });
};

export default useDeleteMemoMutation;
