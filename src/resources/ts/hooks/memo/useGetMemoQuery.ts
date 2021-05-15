import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Memo } from '../../models/Memo';

const getMemo = async (memoId: string): Promise<Memo> => {
  const { data } = await axios.get(`/api/memos/${memoId}`);
  return data;
};

const useGetMemoQuery = <TData = Memo>(
  memoId: string,
  options?: UseQueryOptions<Memo, AxiosError, TData>
): UseQueryResult<TData, AxiosError> =>
  useQuery(['memo', memoId], () => getMemo(memoId), options);

export default useGetMemoQuery;
