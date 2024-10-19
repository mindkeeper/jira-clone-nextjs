import { z } from 'zod';

export const SignupSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .min(1, {
      message: 'Name is required',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
});

export type TSignupSchema = z.infer<typeof SignupSchema>;
