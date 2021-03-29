import React, { FC } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

type Props = {
  memoId: string;
  title: string;
  content: string;
  handleSelectItem: (memoId: string) => void;
};

const MemoListItem: FC<Props> = ({
  memoId,
  title,
  content,
  handleSelectItem,
}) => (
  <ListItem button key={memoId} onClick={() => handleSelectItem(memoId)}>
    <ListItemIcon>
      <AssignmentIcon />
    </ListItemIcon>
    <Box overflow="hidden">
      <ListItemText
        primary={title}
        secondary={content}
        primaryTypographyProps={{
          noWrap: true,
        }}
        secondaryTypographyProps={{
          noWrap: true,
        }}
      />
    </Box>
  </ListItem>
);

export default MemoListItem;
