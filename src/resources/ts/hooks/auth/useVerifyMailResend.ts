import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { MutationError } from '../../models/MutationError';

const verifyMailResend = async (): Promise<string> => {
  const { data } = await axios.post('/api/email/resend');
  return data;
};

const useVerifyMailResend = (): UseMutationResult<
  string,
  AxiosError,
  void,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(verifyMailResend, {
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

export default useVerifyMailResend;
