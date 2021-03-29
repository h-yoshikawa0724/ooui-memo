import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Memos } from '../../models/Memos';

const getMemoList = async ({ pageParam = 1 }): Promise<Memos> => {
  const { data } = await axios.get(`/api/memos?page=${pageParam}`);
  return camelcaseKeys(data);
};

const useGetMemoListQuery = <TData = Memos>(): UseInfiniteQueryResult<
  TData,
  AxiosError
> =>
  useInfiniteQuery('memos', getMemoList, {
    getPreviousPageParam: (firstPage) => firstPage.prevPageUrl ?? false,
    getNextPageParam: (lastPage) => lastPage.nextPageUrl ?? false,
  });

export default useGetMemoListQuery;
