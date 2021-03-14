import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { User } from '../../models/User';
import Header from '../../containers/organisms/Header';

type Props = {
  user: User;
};

const Memo: FC<Props> = ({ user }) => (
  <>
    <CssBaseline />
    <Header logined />
    <Container>
      <Box m={4}>{user && user.name}Memo</Box>
    </Container>
  </>
);

export default Memo;
