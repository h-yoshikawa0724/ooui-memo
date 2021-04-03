import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Memo } from '../../models/Memo';

const getMemo = async (memoId: string): Promise<Memo> => {
  const { data } = await axios.get(`/api/memos/${memoId}`);
  return camelcaseKeys(data);
};

const useGetMemoQuery = <TData = Memo>(
  memoId: string,
  options?: UseQueryOptions<Memo, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery(['memo', memoId], () => getMemo(memoId), options);

export default useGetMemoQuery;
