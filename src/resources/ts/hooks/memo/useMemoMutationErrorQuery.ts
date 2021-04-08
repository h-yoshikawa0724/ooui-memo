import {
  UseQueryResult,
  QueryClient,
  useQueryClient,
  useQuery,
} from 'react-query';
import { MutationError } from '../../models/MutationError';

const getMemoMutationError = async (
  queryClient: QueryClient
): Promise<MutationError> => {
  const error = (await queryClient.getQueryData([
    'memo',
    'error',
  ])) as MutationError;
  return error;
};

const useMemoMutationErrorQuery = (): UseQueryResult<MutationError> => {
  const queryClient = useQueryClient();
  return useQuery(['memo', 'error'], () => getMemoMutationError(queryClient));
};

export default useMemoMutationErrorQuery;
