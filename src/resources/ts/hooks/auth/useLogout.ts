import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { MutationError } from '../../models/MutationError';

const logout = async (): Promise<void> => {
  await axios.post('/api/logout');
};

const useLogout = (): UseMutationResult<void, AxiosError, void, undefined> => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey !== 'user',
      });
      queryClient.resetQueries('user');
    },
    onError: (error) => {
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage: 'ログアウトに失敗しました。',
      };
      queryClient.setQueryData('error', mutationError);
    },
  });
};

export default useLogout;
