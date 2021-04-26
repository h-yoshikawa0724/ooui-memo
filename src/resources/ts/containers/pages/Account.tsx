import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Account from '../../components/pages/Account';
import { useDeleteUserMutation } from '../../hooks/user';

const EnhancedAccount: FC = () => {
  const history = useHistory();
  const { mutate } = useDeleteUserMutation();

  const handleDeleteUser = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        history.push('/login');
      },
    });
  }, [history, mutate]);

  return <Account handleDeleteUser={handleDeleteUser} />;
};

export default EnhancedAccount;
