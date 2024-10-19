import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { SigninSchema, TSigninSchema } from '../../_schema/signin-schema';
import { useSignin } from './use-signin';
export const useSigninForm = () => {
  const form = useForm<TSigninSchema>({
    resolver: zodResolver(SigninSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = useCallback(() => setPasswordVisible((prev) => !prev), []);
  const { mutate, isPending: isMutating, isError, error } = useSignin();
  const onSubmit = (data: TSigninSchema) => {
    mutate(data);
  };

  return { form, onSubmit, passwordVisible, togglePasswordVisibility, isMutating, isError, error };
};
