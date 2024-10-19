'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useSigninForm } from '../sign-in/_hooks/use-signin-form';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SigninCard() {
  const { form, onSubmit, passwordVisible, togglePasswordVisibility, error, isError, isMutating } = useSigninForm();
  return (
    <Card className='w-full h-full md:w-[486px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome Back</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                      type={passwordVisible ? 'text' : 'password'}
                      disabled={isMutating}
                      {...field}
                    />
                    <div
                      className='absolute right-2 inset-y-0 flex items-center justify-center text-muted-foreground'
                      role='button'
                    >
                      {passwordVisible ? (
                        <EyeClosed onClick={togglePasswordVisibility} />
                      ) : (
                        <Eye onClick={togglePasswordVisibility} />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && <FormMessage>{error?.message}</FormMessage>}
            <Button type='submit' className='w-full' disabled={isMutating}>
              {isMutating ? <Loader2 className='animate-spin' /> : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex flex-col gap-y-4'>
        <Button className='w-full' variant={'secondary'} size={'lg'} disabled={isMutating}>
          <FaGoogle className='mr-2 size-5' />
          Sign in with Google
        </Button>
        <Button className='w-full' variant={'secondary'} size={'lg'} disabled={isMutating}>
          <FaGithub className='mr-2 size-5' />
          Sign in with Github
        </Button>
      </CardContent>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 gap-y-4'>
        <p className='text-center'>
          Don&apos;t have an account?{' '}
          <Link className='text-blue-700' href='/sign-up'>
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
