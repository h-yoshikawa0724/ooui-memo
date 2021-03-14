import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import { User } from '../../models/User';
import Memo from '../../components/pages/Memo';

const EnhancedMemo: FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;
  return <Memo user={user} />;
};

export default EnhancedMemo;
