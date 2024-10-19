import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../../_schema/signup-schema';
import { useSignup } from './use-signup';
import { z } from 'zod';

type TPasswordVisibilities = {
  password: boolean;
  confirmPassword: boolean;
};

const SignUpValidator = SignupSchema.extend({
  confirmPassword: z.string().min(1, {
    message: 'Confirm password is required',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type TSignupValidator = z.infer<typeof SignUpValidator>;

export const useSignUpForm = () => {
  const [passwordVisibilities, setPasswordVisibilities] = useState<TPasswordVisibilities>({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = useCallback((field: keyof TPasswordVisibilities) => {
    setPasswordVisibilities((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const form = useForm<TSignupValidator>({
    mode: 'onChange',
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending: isMutating, error, isError } = useSignup();

  const onSubmit = (data: TSignupValidator) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return { form, onSubmit, passwordVisibilities, togglePasswordVisibility, isMutating, isError, error };
};
