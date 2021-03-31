import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
  <ListItem button onClick={() => handleSelectItem(memoId)}>
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
