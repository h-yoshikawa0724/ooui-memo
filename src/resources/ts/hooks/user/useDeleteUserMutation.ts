import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { MutationError } from '../../models/MutationError';

const deleteUser = async (): Promise<void> => {
  await axios.delete('/api/users/me');
};

const useDeleteUserMutation = (): UseMutationResult<
  void,
  AxiosError,
  void,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey !== 'user',
      });
      queryClient.resetQueries('user');
    },
    onError: (error) => {
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage: 'ユーザアカウントの削除に失敗しました。',
      };
      queryClient.setQueryData('error', mutationError);
    },
  });
};

export default useDeleteUserMutation;
