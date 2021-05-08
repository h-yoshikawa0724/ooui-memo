import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { OAuthParams } from '../../models/OAuth';
import { User } from '../../models/User';

const socialLogin = async (
  provider: 'github',
  authParams: OAuthParams
): Promise<User> => {
  const { data } = await axios.post(
    `/api/login/${provider}/callback`,
    authParams
  );
  return data;
};

const useSocialLogin = (): UseMutationResult<
  User,
  AxiosError,
  { provider: 'github'; authParams: OAuthParams },
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ provider, authParams }) => socialLogin(provider, authParams),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );
};

export default useSocialLogin;
