import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const deleteMemo = async (memoId: string): Promise<void> => {
  const { data } = await axios.delete(`/api/memos/${memoId}`);
  return data;
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
  });
};

export default useDeleteMemoMutation;
