import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

type Props = {
  contentCount?: number;
};

const MemoFooter: FC<Props> = ({ contentCount }) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      position="fixed"
      bottom={0}
      p={1}
      zIndex={theme.zIndex.appBar}
      style={{ backgroundColor: 'white' }}
    >
      <Typography color="textSecondary">{contentCount} / 65,535 字</Typography>
    </Box>
  );
};

export default MemoFooter;
