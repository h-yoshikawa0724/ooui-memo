import {
  UseQueryResult,
  QueryClient,
  useQueryClient,
  useQuery,
} from 'react-query';
import { MutationError } from '../../models/MutationError';

const getMutationError = async (
  queryClient: QueryClient
): Promise<MutationError> => {
  const error = (await queryClient.getQueryData('error')) as MutationError;
  return error;
};

const useMutationErrorQuery = (): UseQueryResult<MutationError> => {
  const queryClient = useQueryClient();
  return useQuery('error', () => getMutationError(queryClient));
};

export default useMutationErrorQuery;
