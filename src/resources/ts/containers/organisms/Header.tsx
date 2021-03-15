import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import Header from '../../components/organisms/Header';

type Props = {
  logined: boolean;
};

const EnhancedHeader: FC<Props> = ({ logined }) => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const mutation = useMutation(() => axios.post('/api/logout'), {
    onSuccess: () => {
      queryClient.resetQueries('user');
    },
  });

  const handleLogout = useCallback(() => {
    mutation.mutate();

    history.push('/login');
  }, [mutation, history]);

  return <Header logined={logined} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
