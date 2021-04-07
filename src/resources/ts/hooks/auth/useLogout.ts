import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const logout = async (): Promise<void> => {
  await axios.post('/api/logout');
};

const useLogout = (): UseMutationResult<void, AxiosError, void, undefined> => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export default useLogout;
