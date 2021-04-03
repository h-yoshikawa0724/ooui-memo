import {
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Memos } from '../../models/Memos';

const getMemoList = async ({ pageParam = 1 }): Promise<Memos> => {
  const { data } = await axios.get(`/api/memos?page=${pageParam}`);
  return camelcaseKeys(data, { deep: true });
};

const useGetMemoListQuery = <TData = Memos>(
  options?: UseInfiniteQueryOptions<Memos, AxiosError, TData>
): UseInfiniteQueryResult<TData, AxiosError> =>
  useInfiniteQuery('memos', getMemoList, {
    ...options,
    getPreviousPageParam: (firstPage) =>
      firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
    getNextPageParam: (lastPage) =>
      lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
  });

export default useGetMemoListQuery;
