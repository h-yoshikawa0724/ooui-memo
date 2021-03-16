import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../models/User';

const getLoginUser = async (): Promise<User> => {
  const { data } = await axios.get('/api/user');
  return data;
};

const useUser = <TData = User | null>(
  options?: UseQueryOptions<User, AxiosError, TData>
): QueryObserverResult<TData, AxiosError> =>
  useQuery('user', getLoginUser, options);

export default useUser;
