import React, { FC } from 'react';
import { List } from '@material-ui/core';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';
import { Memos } from '../../models/Memos';

type Props = {
  listData?: Memos[];
  handleAddMemo: VoidFunction;
  handleSelectItem: (memoId: string) => void;
};

const MemoList: FC<Props> = ({ listData, handleAddMemo, handleSelectItem }) => (
  <>
    <MemoListHeader handleAddMemo={handleAddMemo} />
    <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
      {listData?.map((page) => (
        <React.Fragment key={page.currentPage}>
          {page.data.map((memo) => (
            <MemoListItem
              memoId={memo.memoId}
              title={memo.title}
              content={memo.content}
              handleSelectItem={handleSelectItem}
            />
          ))}
        </React.Fragment>
      ))}
    </List>
  </>
);

export default MemoList;
