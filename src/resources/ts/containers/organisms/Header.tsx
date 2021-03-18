import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Header from '../../components/organisms/Header';
import { User } from '../../models/User';
import { useLogout } from '../../hooks/auth';

const EnhancedHeader: FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;

  const history = useHistory();
  const { mutate } = useLogout();

  const handleLogout = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        history.push('/login');
      },
    });
  }, [history, mutate]);

  return <Header userName={user?.name} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
