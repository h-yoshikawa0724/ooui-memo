import React, { FC, useState, useEffect, useMemo } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import SocialLoginProgress from '../../components/pages/SocialLoginProgress';
import { useSocialLogin } from '../../hooks/auth';
import { Provider, OAuthParams } from '../../models/OAuth';

const EnhancedSocialLoginProgress: FC = () => {
  const { provider } = useParams<{ provider: Provider }>();
  const history = useHistory();
  const location = useLocation();
  const socialResponse = useMemo(
    () => queryString.parse(location.search) ?? {},
    [location.search]
  );
  const [oAuthError, setOAuthError] = useState<boolean>(false);
  const { error, mutate: socialLogin } = useSocialLogin();
  const statusCode = error?.response?.status;

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(socialResponse, 'error')) {
      setOAuthError(true);
      return;
    }
    socialLogin(
      { provider, authParams: socialResponse as OAuthParams },
      {
        onSuccess: () => {
          history.replace('/');
        },
      }
    );
  }, [history, provider, socialResponse, socialLogin]);

  return (
    <SocialLoginProgress oAuthError={oAuthError} statusCode={statusCode} />
  );
};

export default EnhancedSocialLoginProgress;
