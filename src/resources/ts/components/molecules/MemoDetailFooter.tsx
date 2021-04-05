import React, { FC } from 'react';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  decorationLine: {
    borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
    borderImageSlice: 1,
  },
}));

type Props = {
  marginTop: number;
  contentCount: number;
  isUnsaved: boolean;
  updatedAt?: Date;
};

const MemoFooter: FC<Props> = ({
  marginTop = 0,
  contentCount,
  isUnsaved,
  updatedAt,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box
      mt={marginTop} // 8 × marginTop が実際にあたる値
      p={1}
      zIndex={theme.zIndex.appBar}
      display="flex"
      borderTop={2}
      className={classes.decorationLine}
    >
      <Box flexGrow={1}>
        <Badge color="primary" variant="dot" invisible={!isUnsaved}>
          <Typography color="textSecondary">{updatedAt}</Typography>
        </Badge>
      </Box>
      <Typography color="textSecondary">
        {contentCount.toLocaleString()} / 65,535 字
      </Typography>
    </Box>
  );
};

export default MemoFooter;
