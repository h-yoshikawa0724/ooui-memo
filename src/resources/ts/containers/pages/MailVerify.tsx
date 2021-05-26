import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MailVerify from '../../components/pages/MailVerify';

const EnhancedMailVerify: FC = () => {
  const location = useLocation();
  const { mailSend } = (location.state as { mailSend: boolean }) || false;

  const handleMailResend = useCallback(() => {
    console.log('mail resend');
    // TODO メール再送信処理
  }, []);

  return <MailVerify mailSend={mailSend} handleMailResend={handleMailResend} />;
};

export default EnhancedMailVerify;
