import { UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Provider, OAuthRedirect } from '../../models/OAuth';

const getOAuthUrl = async (provider: Provider): Promise<OAuthRedirect> => {
  const { data } = await axios.get(`/api/login/${provider}`);
  return camelcaseKeys(data);
};

const useOAuthUrl = (): UseMutationResult<
  OAuthRedirect,
  AxiosError,
  Provider,
  undefined
> =>
  useMutation(getOAuthUrl, {
    onSuccess: (data) => {
      window.location.href = data.redirectUrl;
    },
  });

export default useOAuthUrl;
