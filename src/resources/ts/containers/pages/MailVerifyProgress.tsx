import React, { FC } from 'react';
import MailVerifyProgress from '../../components/pages/MailVerifyProgress';

const EnhancedMailVerifyProgress: FC = () => {
  const isLoading = false;
  const statusCode = undefined;
  // TODO メール認証処理
  console.log('mail progress');

  return <MailVerifyProgress isLoading={isLoading} statusCode={statusCode} />;
};

export default EnhancedMailVerifyProgress;
