import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../../models/User';

// 未ログイン時は空文字が返るのでstring型も
const getLoginUser = async (): Promise<User | string> => {
  const { data } = await axios.get('/api/user');
  return data;
};

const useGetUserQuery = <TData = User | string>(
  options?: UseQueryOptions<User | string, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery('user', getLoginUser, options);

export default useGetUserQuery;
