import React, { FC } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

type Props = {
  handleSelectItem: VoidFunction;
};

const MemoListItem: FC<Props> = ({ handleSelectItem }) => (
  <ListItem button onClick={handleSelectItem}>
    <ListItemIcon>
      <AssignmentIcon />
    </ListItemIcon>
    <Box overflow="hidden">
      <ListItemText
        primary="Single-line item"
        secondary="Secondary text Secondary text Secondary text Secondary"
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
