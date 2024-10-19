'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in';
  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <nav className='flex items-center justify-between'>
          <Image src='/logo.svg' alt='Logo' width={80} height={32} />
          <Button variant={'secondary'} asChild>
            <Link href={isSignIn ? '/sign-up' : '/sign-in'}>{isSignIn ? 'Sign Up' : 'Sign In'}</Link>
          </Button>
        </nav>
        <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>{children}</div>
      </div>
    </main>
  );
}
