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

const MemoBody: FC = () => (
  <Box display="flex">
    <Box
      width={{ xs: 'calc(100vw - 32px)' }}
      maxWidth={{ sm: 320 }}
      pr={{ xs: 2 }}
      flexGrow={1}
      // className={isNarrowDetailMode ? classes.display : ""}
    >
      {/* <MemoList listClickAction={enableNarrowDetailMode} /> */}
      <MemoList />
    </Box>
    <Box
      px={{ xs: 2, sm: 4 }}
      flexGrow={2}
      // className={!isNarrowDetailMode ? classes.display : ""}
    >
      {/* <MemoDetail backAction={disableNarrowDetailMode} /> */}
      <MemoDetail />
    </Box>
  </Box>
);

const Memo: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  // const [isNarrowDetailMode, updateIsNarrowDetailMode] = useState(false);
  // const enableNarrowDetailMode = () => updateIsNarrowDetailMode(true);
  // const disableNarrowDetailMode = () => updateIsNarrowDetailMode(false);

  return (
    <>
      <Header />
      {matches ? (
        <Container>
          <MemoBody />
        </Container>
      ) : (
        <MemoBody />
      )}
    </>
  );
};

export default Memo;
