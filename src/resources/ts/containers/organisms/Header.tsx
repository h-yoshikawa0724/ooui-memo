import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import Header from '../../components/organisms/Header';
import { User } from '../../models/User';
import useAuth from '../../hooks/useAuth';

const EnhancedHeader: FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;
  const { handleLogout } = useAuth();

  return <Header userName={user && user.name} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
