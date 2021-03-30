import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';
import { Memos } from '../../models/Memos';

type Props = {
  listData?: Memos[];
  loadMoreRef: React.RefObject<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  handleAddMemo: VoidFunction;
  handleSelectItem: (memoId: string) => void;
};

const MemoList: FC<Props> = ({
  listData,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  handleAddMemo,
  handleSelectItem,
}) => {
  let loadMoreMessage;
  if (isFetchingNextPage) {
    loadMoreMessage = '読み込み中...';
  } else {
    loadMoreMessage = hasNextPage ? '続きを読み込む' : ' ';
  }

  return (
    <>
      <MemoListHeader handleAddMemo={handleAddMemo} />
      <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
        {listData?.map((page) => (
          <React.Fragment key={page.currentPage}>
            {page.data.map((memo) => (
              <MemoListItem
                key={memo.memoId}
                memoId={memo.memoId}
                title={memo.title}
                content={memo.content}
                handleSelectItem={handleSelectItem}
              />
            ))}
          </React.Fragment>
        ))}
        <Box {...{ ref: loadMoreRef }} textAlign="center">
          {loadMoreMessage}
        </Box>
      </List>
    </>
  );
};

export default MemoList;
