import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Account from '../../components/pages/Account';
import { useDeleteUserMutation } from '../../hooks/user';

const EnhancedAccount: FC = () => {
  const history = useHistory();
  const { error, isLoading, mutate } = useDeleteUserMutation();
  const statusCode = error?.response?.status;

  const handleDeleteUser = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        history.replace('/login');
      },
    });
  }, [history, mutate]);

  return (
    <Account
      statusCode={statusCode}
      isLoading={isLoading}
      handleDeleteUser={handleDeleteUser}
    />
  );
};

export default EnhancedAccount;
