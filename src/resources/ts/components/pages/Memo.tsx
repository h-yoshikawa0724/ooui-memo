import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import MemoList from '../../containers/organisms/MemoList';
import MemoDetail from '../../containers/organisms/MemoDetail';
import MutationErrorAlertBar from '../molecules/MutationErrorAlertBar';
import { MutationError } from '../../models/MutationError';

type BodyProps = {
  memoId: string;
};

const MemoBody: FC<BodyProps> = ({ memoId }) => {
  const selectedMemo = !!memoId;
  return (
    <Box display="flex">
      <Hidden xsDown={selectedMemo}>
        <Box
          width={{ xs: 'calc(100vw - 32px)' }}
          maxWidth={{ sm: 320 }}
          pr={{ xs: 2 }}
          flexGrow={1}
        >
          <MemoList memoId={memoId} />
        </Box>
      </Hidden>
      <Hidden xsDown={!selectedMemo}>
        <Box px={{ xs: 2, sm: 4 }} flexGrow={2}>
          <MemoDetail memoId={memoId} />
        </Box>
      </Hidden>
    </Box>
  );
};

type Props = {
  memoId: string;
  error?: MutationError;
  handleErrorBarClose: (event?: React.SyntheticEvent, reason?: string) => void;
};

const Memo: FC<Props> = ({ memoId, error, handleErrorBarClose }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Header />
      {matches ? (
        <Container>
          <MemoBody memoId={memoId} />
        </Container>
      ) : (
        <MemoBody memoId={memoId} />
      )}
      <MutationErrorAlertBar
        error={error}
        handleErrorBarClose={handleErrorBarClose}
      />
    </>
  );
};

export default Memo;
