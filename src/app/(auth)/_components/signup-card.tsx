'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useSignUpForm } from '../sign-up/_hooks/use-signup-form';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function SignupCard() {
  const { form, onSubmit, passwordVisibilities, togglePasswordVisibility, error, isError, isMutating } = useSignUpForm();
  return (
    <Card className='w-full h-full md:w-[486px] border-none shadow-none'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{' '}
          <Link href='/privacy'>
            <span className='text-blue-700'>Privacy Poilcy</span>
          </Link>{' '}
          and{' '}
          <Link href='/terms'>
            <span className='text-blue-700'>Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input placeholder='Your Name' type='text' disabled={isMutating} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input placeholder='Your email address' type='email' disabled={isMutating} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <Input
                      placeholder='Password'
                      type={passwordVisibilities.password ? 'text' : 'password'}
                      disabled={isMutating}
                      {...field}
                    />
                    <div
                      className='absolute inset-y-0 right-2 flex items-center justify-center text-muted-foreground'
                      role='button'
                    >
                      {passwordVisibilities.password ? (
                        <EyeClosed onClick={() => togglePasswordVisibility('password')} />
                      ) : (
                        <Eye onClick={() => togglePasswordVisibility('password')} />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='confirmPassword'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <Input
                      placeholder='Confirm Password'
                      disabled={isMutating}
                      type={passwordVisibilities.confirmPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <div
                      className='absolute inset-y-0 right-2 flex items-center justify-center text-muted-foreground'
                      role='button'
                    >
                      {passwordVisibilities.confirmPassword ? (
                        <EyeClosed onClick={() => togglePasswordVisibility('confirmPassword')} />
                      ) : (
                        <Eye onClick={() => togglePasswordVisibility('confirmPassword')} />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && <FormMessage>{error?.message}</FormMessage>}
            <Button type='submit' className='w-full' disabled={isMutating}>
              {isMutating ? <Loader2 className='animate-spin' /> : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 space-y-4'>
        <Button className='w-full' variant={'secondary'} size={'lg'} disabled={isMutating}>
          <FaGoogle className='mr-2 size-5' />
          Sign up with Google
        </Button>
        <Button className='w-full' variant={'secondary'} size={'lg'} disabled={isMutating}>
          <FaGithub className='mr-2 size-5' />
          Sign up with Github
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        <div className='text-center'>
          Already have an account?{' '}
          <Link href='/sign-in'>
            <span className='text-blue-700'>Sign In</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
