import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import AssignmentIcon from '@material-ui/icons/Assignment';

const MemoListItemSkeleton: FC = () => (
  <ListItem>
    <ListItemIcon>
      <Skeleton>
        <AssignmentIcon />
      </Skeleton>
    </ListItemIcon>
    <Skeleton width="100%">
      <ListItemText primary="skeleton" secondary="skeleton" />
    </Skeleton>
  </ListItem>
);

export default MemoListItemSkeleton;
