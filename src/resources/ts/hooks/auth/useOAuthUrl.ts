import { UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { OAuthRedirect } from '../../models/OAuth';

type providerName = 'github';

const getOAuthUrl = async (provider: providerName): Promise<OAuthRedirect> => {
  const { data } = await axios.get(`/api/login/${provider}`);
  return camelcaseKeys(data);
};

const useOAuthUrl = (): UseMutationResult<
  OAuthRedirect,
  AxiosError,
  providerName,
  undefined
> =>
  useMutation(getOAuthUrl, {
    onSuccess: (data) => {
      window.location.href = data.redirectUrl;
    },
  });

export default useOAuthUrl;
