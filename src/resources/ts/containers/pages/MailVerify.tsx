import React, { FC, useCallback } from 'react';
import MailVerify from '../../components/pages/MailVerify';

const EnhancedMailVerify: FC = () => {
  const handleMailResend = useCallback(() => {
    console.log('mail resend');
    // TODO メール再送信処理
  }, []);

  return <MailVerify handleMailResend={handleMailResend} />;
};

export default EnhancedMailVerify;
