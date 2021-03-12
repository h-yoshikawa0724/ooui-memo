import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../organisms/Header';

const Memo: FC = () => (
  <>
    <CssBaseline />
    <Header logined />
    <Container>
      <Box m={4}>Memo</Box>
    </Container>
  </>
);

export default Memo;
