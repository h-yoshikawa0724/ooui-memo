import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { User } from '../../models/User';
import Header from '../organisms/Header';

const Memo: FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;
  return (
    <>
      <CssBaseline />
      <Header logined />
      <Container>
        <Box m={4}>{user && user.name}Memo</Box>
      </Container>
    </>
  );
};

export default Memo;
