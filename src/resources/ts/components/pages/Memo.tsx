import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Header from '../../containers/organisms/Header';

const Memo: FC = () => (
  <>
    <Header />
    <Container>
      <Box m={4}>Memo</Box>
    </Container>
  </>
);

export default Memo;
