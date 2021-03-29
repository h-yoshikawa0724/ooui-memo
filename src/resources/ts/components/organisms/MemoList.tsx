import React, { FC } from 'react';
import { List } from '@material-ui/core';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';

type Props = {
  handleAddMemo: VoidFunction;
  handleSelectItem: VoidFunction;
};

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const MemoList: FC<Props> = ({ handleAddMemo, handleSelectItem }) => (
  <>
    <MemoListHeader handleAddMemo={handleAddMemo} />
    <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
      {generate(<MemoListItem handleSelectItem={handleSelectItem} />)}
    </List>
  </>
);

export default MemoList;
