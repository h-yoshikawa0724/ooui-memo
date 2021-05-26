import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MailVerify from '../../components/pages/MailVerify';
import { useVerifyMailResend } from '../../hooks/auth';

const EnhancedMailVerify: FC = () => {
  const location = useLocation();
  const { mailSend } = (location.state as { mailSend: boolean }) || false;

  const { isLoading, mutate: verityMailResend } = useVerifyMailResend();

  const handleMailResend = useCallback(() => {
    verityMailResend();
  }, [verityMailResend]);

  return (
    <MailVerify
      mailSend={mailSend}
      isLoading={isLoading}
      handleMailResend={handleMailResend}
    />
  );
};

export default EnhancedMailVerify;
