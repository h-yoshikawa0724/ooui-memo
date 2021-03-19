import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { User } from '../../models/User';

type FormData = {
  email: string;
  password: string;
};

const login = async (formData: FormData): Promise<User> => {
  const { data } = await axios.post('/api/login', formData);
  return data;
};

const useLogin = (): UseMutationResult<
  User,
  AxiosError,
  FormData,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData('user', data);
    },
  });
};

export default useLogin;
