import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import useTheme from '@material-ui/core/styles/useTheme';
import Header from '../../components/organisms/Header';

type Props = {
  logined: boolean;
};

const EnhancedHeader: FC<Props> = ({ logined }) => {
  const history = useHistory();
  const theme = useTheme();
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

  return <Header logined={logined} theme={theme} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
