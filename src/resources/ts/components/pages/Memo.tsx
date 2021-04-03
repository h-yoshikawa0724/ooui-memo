import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../containers/organisms/Header';
import MemoList from '../../containers/organisms/MemoList';
import MemoDetail from '../../containers/organisms/MemoDetail';

const useStyles = makeStyles((theme) => ({
  display: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

type Props = {
  memoId: string;
};

const MemoBody: FC<Props> = ({ memoId }) => {
  const classes = useStyles();
  const selectedMemo = !!memoId;
  return (
    <Box display="flex">
      <Box
        width={{ xs: 'calc(100vw - 32px)' }}
        maxWidth={{ sm: 320 }}
        pr={{ xs: 2 }}
        flexGrow={1}
        className={selectedMemo ? classes.display : ''}
      >
        <MemoList memoId={memoId} />
      </Box>
      <Box
        px={{ xs: 2, sm: 4 }}
        flexGrow={2}
        className={!selectedMemo ? classes.display : ''}
      >
        <MemoDetail memoId={memoId} />
      </Box>
    </Box>
  );
};

const Memo: FC<Props> = ({ memoId }) => {
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
    </>
  );
};

export default Memo;
