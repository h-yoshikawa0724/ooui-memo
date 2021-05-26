import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../../models/User';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const register = async (formData: FormData): Promise<User> => {
  const { data } = await axios.post('/api/register', formData);
  return data;
};

const useRegister = (): UseMutationResult<
  User,
  AxiosError,
  FormData,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(register, {
    onSuccess: (data) => {
      queryClient.setQueryData('user', data);
    },
  });
};

export default useRegister;
