import {
  UseQueryResult,
  QueryClient,
  useQueryClient,
  useQuery,
} from 'react-query';

const getMutationSuccess = async (
  queryClient: QueryClient
): Promise<string> => {
  const success = (await queryClient.getQueryData('success')) as string;
  return success;
};

const useMutationSuccessQuery = (): UseQueryResult<string> => {
  const queryClient = useQueryClient();
  return useQuery('success', () => getMutationSuccess(queryClient));
};

export default useMutationSuccessQuery;
