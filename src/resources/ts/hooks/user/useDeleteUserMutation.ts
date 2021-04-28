import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

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
  });
};

export default useDeleteUserMutation;
