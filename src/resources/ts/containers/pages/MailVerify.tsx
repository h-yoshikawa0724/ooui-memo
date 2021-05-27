import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MailVerify from '../../components/pages/MailVerify';
import { useAuthMailResend } from '../../hooks/auth';

const EnhancedMailVerify: FC = () => {
  const location = useLocation();
  const { mailSend } = (location.state as { mailSend: boolean }) || false;

  const { isLoading, mutate: authMailResend } = useAuthMailResend();

  const handleMailResend = useCallback(() => {
    authMailResend();
  }, [authMailResend]);

  return (
    <MailVerify
      mailSend={mailSend}
      isLoading={isLoading}
      handleMailResend={handleMailResend}
    />
  );
};

export default EnhancedMailVerify;
