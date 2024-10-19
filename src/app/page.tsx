'use client';

import { Button } from '@/components/ui/button';
import { useCurrentSession } from '@/hooks/use-current-session';
import { useSignout } from '@/hooks/use-signout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data, isLoading } = useCurrentSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push('/sign-in');
    }
  }, [data, isLoading, router]);
  const { mutate } = useSignout();
  return (
    <div className='flex flex-col gap-2 h-screen w-screen items-center justify-center'>
      <h1>Authorized as {data?.email}</h1>
      <Button onClick={() => mutate()}>Sign out</Button>
    </div>
  );
}
