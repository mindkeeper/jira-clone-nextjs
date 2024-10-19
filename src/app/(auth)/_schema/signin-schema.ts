import { z } from 'zod';
export const SigninSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' })
    .min(1, {
      message: 'Email is required',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export type TSigninSchema = z.infer<typeof SigninSchema>;
