import {
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Memos } from '../../models/Memos';

const getMemoList = async ({
  searchWord = '',
  pageParam = 1,
}): Promise<Memos> => {
  let memoData;
  if (searchWord) {
    const { data } = await axios.get(
      `/api/memos?searchWord=${searchWord}&page=${pageParam}`
    );
    memoData = data;
  } else {
    const { data } = await axios.get(`/api/memos?page=${pageParam}`);
    memoData = data;
  }
  return camelcaseKeys(memoData, { deep: true });
};

const useGetMemoListQuery = <TData = Memos>(
  searchWord?: string,
  options?: UseInfiniteQueryOptions<Memos, AxiosError, TData>
): UseInfiniteQueryResult<TData, AxiosError> =>
  useInfiniteQuery(
    'memos',
    ({ pageParam }) => getMemoList({ searchWord, pageParam }),
    {
      ...options,
      getPreviousPageParam: (firstPage) =>
        firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
      getNextPageParam: (lastPage) =>
        lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    }
  );

export default useGetMemoListQuery;
