import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { MutationError } from '../../models/MutationError';

const authMailResend = async (): Promise<string> => {
  const { data } = await axios.post('/api/mail/resend');
  return data;
};

const useAuthMailResend = (): UseMutationResult<
  string,
  AxiosError,
  void,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(authMailResend, {
    onSuccess: (data) => {
      queryClient.setQueryData('success', data);
    },
    onError: (error) => {
      const mutationError: MutationError = {
        statusCode: error.response?.status,
        errorMessage: 'メール再送信に失敗しました。',
      };
      queryClient.setQueryData('error', mutationError);
    },
  });
};

export default useAuthMailResend;
