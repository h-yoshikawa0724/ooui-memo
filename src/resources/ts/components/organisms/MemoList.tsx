import React, { FC } from 'react';
import { List } from '@material-ui/core';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';

type Props = {
  handleAddMemo: VoidFunction;
  handleSelectItem: (memoId: string) => void;
};

const data = [
  {
    memoId: 'aaa',
    title: 'Single-line item1',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'bbb',
    title: 'Single-line item2',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'ccc',
    title: 'Single-line item3',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'ddd',
    title: 'Single-line item4',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'eee',
    title: 'Single-line item5',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'fff',
    title: 'Single-line item6',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'ggg',
    title: 'Single-line item7',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'hhh',
    title: 'Single-line item8',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
  {
    memoId: 'iii',
    title: 'Single-line item9',
    content: 'Secondary text Secondary text Secondary text Secondary',
  },
];

const MemoList: FC<Props> = ({ handleAddMemo, handleSelectItem }) => (
  <>
    <MemoListHeader handleAddMemo={handleAddMemo} />
    <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
      {data.map((item) => (
        <MemoListItem
          memoId={item.memoId}
          title={item.title}
          content={item.content}
          handleSelectItem={handleSelectItem}
        />
      ))}
    </List>
  </>
);

export default MemoList;
