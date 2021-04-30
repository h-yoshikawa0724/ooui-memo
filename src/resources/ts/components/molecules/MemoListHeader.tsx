import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AddMemoButton from '../atoms/AddMemoButton';

type Props = {
  searchWord: string;
  handleChangeSearchWord: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddMemo: VoidFunction;
};

const MemoListHeader: FC<Props> = ({
  searchWord,
  handleChangeSearchWord,
  handleAddMemo,
}) => (
  <Box component="header" height={48} px={2} display="flex" alignItems="center">
    <Input
      type="search"
      placeholder="検索ワード"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      value={searchWord}
      inputProps={{ 'aria-label': 'メモ検索ワード入力' }}
      style={{ height: '32px', flexGrow: 1 }}
      onChange={handleChangeSearchWord}
    />
    <AddMemoButton handleAddMemo={handleAddMemo} />
  </Box>
);

export default MemoListHeader;
