import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { User } from '../../models/User';

const getLoginUser = async (): Promise<User> => {
  const { data } = await axios.get('/api/users/me');
  return camelcaseKeys(data);
};

const useGetUserQuery = <TData = User>(
  options?: UseQueryOptions<User, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => useQuery('user', getLoginUser, options);

export default useGetUserQuery;
